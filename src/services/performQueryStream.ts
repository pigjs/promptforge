// import { getOpenAIApiKey, getOpenAIModel } from '@/utils/index';
import { message } from 'antd';
import { ChatGPTApi } from './chatgpt-browser';

import type { CreateChatCompletionResponse } from './chatgpt-browser';

type PerformQueryOptionsType = {
    /** 重试次数 默认 3 */
    maxAttempts?: number;
    /** 应用id */
    id: string;
    /** userPrompt 配置 */
    userPromptOptions: Record<string, any>;
    // /** 系统 Prompt */
    // systemPrompt: string;
    // /** 用户 Prompt */
    // userPrompt: string;
    // /** 上下文 */
    // messages?: any[];
    onProgress: (content: string) => void;
};

// @ts-ignore
export async function performQueryStream(options: PerformQueryOptionsType) {
    const { maxAttempts = 3, onProgress, id, userPromptOptions } = options;
    // const key = getOpenAIApiKey();
    // const model = getOpenAIModel();
    const openai = new ChatGPTApi({ apiUrl: '/api/forge/completions' });

    for (let i = 0; i < maxAttempts; i++) {
        try {
            const completion = await openai.createChatCompletion({
                // model,
                // messages: [
                //     {
                //         role: 'system',
                //         content: systemPrompt
                //     },
                //     ...messages,
                //     {
                //         role: 'user',
                //         content: userPrompt
                //     }
                // ],
                // max_tokens: 500,
                // temperature: 0,
                id,
                userPromptOptions,
                onProgress: (result: CreateChatCompletionResponse) => {
                    const content = result.data.choices[0].message?.content as string;
                    onProgress?.(content);
                }
            });
            return {
                prompt: userPromptOptions.prompt,
                response: completion.data.choices[0].message?.content?.trim()
            };
        } catch (error: any) {
            console.log('performQuery error', error);
            if (error.includes('server error')) {
                // Problem with the OpenAI API, try again
                message.error(error);
            } else {
                // Another error, give up
                throw error;
            }
        }
    }
    throw `Failed to complete query after ${maxAttempts} attempts. Please try again later.`;
}
