import { openAIModel } from '@/config';
import { getOpenAIApiKey } from '@/utils/index';
import { Modal } from 'antd';
import type { CreateCompletionResponseUsage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';

type PerformQueryOptionsType = {
    /** 重试次数 默认 3 */
    maxAttempts?: number;
    /** 系统 Prompt */
    systemPrompt: string;
    /** 用户 Prompt */
    userPrompt: string;
};

// @ts-ignore
export async function performQuery(options: PerformQueryOptionsType): Promise<{
    usage: CreateCompletionResponseUsage;
    prompt: string;
    response: string | undefined;
}> {
    const { maxAttempts = 3, systemPrompt, userPrompt } = options;
    const key = getOpenAIApiKey();
    const openai = new OpenAIApi(new Configuration({ apiKey: key }));

    for (let i = 0; i < maxAttempts; i++) {
        try {
            const completion = await openai.createChatCompletion({
                model: openAIModel,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ],
                max_tokens: 500,
                temperature: 0
            });
            return {
                usage: completion.data.usage as CreateCompletionResponseUsage,
                prompt: userPrompt,
                response: completion.data.choices[0].message?.content?.trim()
            };
        } catch (error: any) {
            console.log('performQuery error', error);
            const { message } = error.response.data.error;
            if (message.includes('server error')) {
                // Problem with the OpenAI API, try again
                Modal.error({
                    title: '温馨提示',
                    content: message
                });
            } else {
                // Another error, give up
                throw new Error(message);
            }
        }
        throw new Error(`Failed to complete query after ${maxAttempts} attempts. Please try again later.`);
    }
}
