import { openAIModel } from '@/config';
import { getOpenAIApiKey } from '@/utils/index';
import { Modal } from 'antd';
import { ChatGPTApi } from './chatgpt-browser';

import type { CreateChatCompletionResponse } from './chatgpt-browser';

type PerformQueryOptionsType = {
    /** 重试次数 默认 3 */
    maxAttempts?: number;
    /** 系统 Prompt */
    systemPrompt: string;
    /** 用户 Prompt */
    userPrompt: string;
    onProgress: (content: string) => void;
};

// @ts-ignore
export async function performQueryStream(options: PerformQueryOptionsType) {
    const { maxAttempts = 3, systemPrompt, userPrompt, onProgress } = options;
    const key = getOpenAIApiKey();
    const openai = new ChatGPTApi({ apiKey: key });

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
                temperature: 0,
                onProgress: (result: CreateChatCompletionResponse) => {
                    const content = result.data.choices[0].message?.content as string;
                    onProgress?.(content);
                }
            });
            return {
                prompt: userPrompt,
                response: completion.data.choices[0].message?.content?.trim()
            };
        } catch (error: any) {
            console.error('performQuery error', error);
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
