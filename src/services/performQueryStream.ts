import { message } from 'antd';
import { ChatGPTApi } from './chatgpt-browser';

import type { CreateChatCompletionRequest, CreateChatCompletionResponse } from './chatgpt-browser';

export type PerformQueryOptionsType = Omit<CreateChatCompletionRequest, 'onProgress'> & {
    /** 重试次数 默认 3 */
    maxAttempts?: number;
    onProgress: (content: string) => void;
};

// @ts-ignore
export async function performQueryStream(options: PerformQueryOptionsType) {
    const { maxAttempts = 3, onProgress, ...resetOptions } = options;
    const openai = new ChatGPTApi({ apiUrl: 'https://promptforge.uk/v1/chat/completions' });

    for (let i = 0; i < maxAttempts; i++) {
        try {
            const completion = await openai.createChatCompletion({
                onProgress: (result: CreateChatCompletionResponse) => {
                    const content = result.data.choices[0].message?.content as string;
                    onProgress?.(content);
                },
                ...resetOptions
            });
            return {
                response: completion.data.choices[0].message?.content?.trim()
            };
        } catch (error: any) {
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
