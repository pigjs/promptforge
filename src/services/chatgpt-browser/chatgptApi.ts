import { fetchSSE } from './fetchSSE';

import type {
    CreateChatCompletionRequest as OCreateChatCompletionRequest,
    CreateChatCompletionResponse as OCreateChatCompletionResponse
} from 'openai';

export type CreateChatCompletionResponse = {
    data: OCreateChatCompletionResponse;
};

export type CreateChatCompletionRequest = OCreateChatCompletionRequest & {
    onProgress: (result: CreateChatCompletionResponse) => void;
};

export type ChatGPTOptions = {
    // apiKey: string;
    apiUrl?: string;
};

export class ChatGPTApi {
    protected _apiKey: string;
    protected _apiUrl: string;

    constructor(options: ChatGPTOptions) {
        const { apiUrl = 'https://api.openai.com/v1/chat/completions' } = options;
        // this._apiKey = apiKey;
        this._apiUrl = apiUrl;

        // if (!this._apiKey) {
        //     throw new Error('OpenAI missing required apiKey');
        // }
    }

    createChatCompletion = (options: any) => {
        const { onProgress, ...resetOptions } = options;
        const abortController = new AbortController();
        const { signal } = abortController;

        const response = new Promise((resolve, reject) => {
            const url = this._apiUrl;
            const headers = {
                'Content-Type': 'application/json'
                // Authorization: `Bearer ${this._apiKey}`
            };
            const body = JSON.stringify({ ...resetOptions });
            // @ts-ignore
            let result: OCreateChatCompletionResponse = {};
            let content = '';
            fetchSSE(url, {
                method: 'POST',
                headers,
                body,
                signal,
                onMessage: (data: string) => {
                    if (data === '[DONE]') {
                        const { choices } = result;
                        choices[0] = {
                            ...choices[0],
                            // @ts-ignore
                            message: {
                                ...choices[0].message,
                                content
                            }
                        };

                        return resolve({
                            // 和 openAi 保持一致
                            data: {
                                ...result,
                                choices
                            }
                        });
                    }
                    try {
                        const response = JSON.parse(data);
                        const { object, ...resetResponse } = response;
                        const choices = [...response.choices];
                        const { delta, ...resetChoices } = choices[0];
                        if (delta.content === undefined) {
                            return;
                        }
                        content += delta.content;

                        choices[0] = {
                            ...resetChoices,
                            message: {
                                ...delta
                            }
                        };
                        result = {
                            ...resetResponse,
                            choices
                        };
                        // 和 openAi 保持一致
                        onProgress?.({ data: result });
                    } catch (err) {
                        console.warn('OpenAI stream SEE event unexpected error', err);
                        return reject(err);
                    }
                },
                onError: (error) => {
                    reject(error);
                }
            });
        });

        (response as any).cancel = () => {
            abortController.abort();
        };

        return response as unknown as Promise<CreateChatCompletionResponse>;
    };
}
