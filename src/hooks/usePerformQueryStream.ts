import { RoleEnum } from '@/components/messageList';
import { performQueryStream } from '@/services/performQueryStream';
import { generateId } from '@/utils/generateId';
import { isString, mergeProps, useEvent } from '@pigjs/utils';
import React from 'react';

import type { MessageType } from '@/components/messageList';
import type { PerformQueryOptionsType } from '@/services/performQueryStream';

export type RunOptions = Omit<
    PerformQueryOptionsType,
    'maxAttempts' | 'onProgress' | 'model' | 'max_tokens' | 'temperature' | 'stream'
> & {
    model?: PerformQueryOptionsType['model'];
    max_tokens?: PerformQueryOptionsType['max_tokens'];
    temperature?: PerformQueryOptionsType['temperature'];
};

export type OptionsType =
    | {
          apiKey: string;
          content: RunOptions;
      }
    | string;

export type StreamMessage = {
    role: RoleEnum;
    content: string;
};

const defaultOptions = {
    model: 'gpt-3.5-turbo',
    max_tokens: 600,
    temperature: 0,
    stream: true
};

export function usePerformQueryStream() {
    const [loading, setLoading] = React.useState(false);
    const [streamMessage, setStreamMessage] = React.useState<StreamMessage>();
    const [streamLoading, setStreamLoading] = React.useState(false);

    const run = useEvent(async (options: OptionsType) => {
        let resetOptions;
        // options 未 string时，是加密的openai信息
        if (isString(options)) {
            resetOptions = { content: options };
        } else {
            const { content, apiKey } = options;
            const resetContent = mergeProps(defaultOptions, content);
            resetOptions = {
                apiKey,
                content: resetContent
            };
        }
        const onProgress = (content: string) => {
            setStreamLoading(false);
            setStreamMessage((state) => {
                const prevContent = state?.content || '';
                return {
                    role: RoleEnum.assistant,
                    content: prevContent + content
                };
            });
        };
        const message: MessageType = {
            id: generateId(),
            role: RoleEnum.assistant
        };
        setLoading(true);
        setStreamLoading(true);
        // 给个初始值
        setStreamMessage(() => {
            return {
                role: RoleEnum.assistant,
                content: ''
            };
        });
        try {
            // @ts-ignore
            const { response } = await performQueryStream({ ...resetOptions, onProgress });
            message.content = response;
        } catch (err) {
            message.error = isString(err) ? err : JSON.stringify(err);
        } finally {
            setLoading(false);
            setStreamMessage(undefined);
        }
        return message;
    });

    return {
        streamMessage,
        loading,
        run,
        streamLoading
    };
}
