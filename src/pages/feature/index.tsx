import FieldRender from '@/components/fieldRender';
import prompt from '@/prompt';
import { performQueryStream } from '@/services/performQueryStream';
import { isFunction, isString, useMount, useSetState, useUrlParam } from '@pigjs/utils';
import React from 'react';

import type { ConversationType, MessageListType } from '@/components/fieldRender';

import styles from './index.less';

const Index = () => {
    const [loading, setLoading] = React.useState(false);
    const [messageList, setMessageList] = React.useState<MessageListType[]>([]);
    const [conversations, setConversations] = React.useState<ConversationType[]>([]);
    const [streamState, setStreamState] = useSetState<any>({
        stream: false,
        streamList: []
    });

    const feature = useUrlParam('feature');

    const promptMemo = React.useMemo(() => {
        // @ts-ignore
        return prompt[feature];
    }, [feature]);

    const onSend = async (values: Record<string, any>) => {
        const { userPrompt, systemPrompt } = promptMemo.prompt;
        const userPromptContent = isFunction(userPrompt) ? userPrompt(values) : values.prompt;
        const systemPromptContent = isFunction(systemPrompt) ? systemPrompt(values) : systemPrompt;
        try {
            setLoading(true);
            const { response } = await performQueryStream({
                userPrompt: userPromptContent,
                systemPrompt: systemPromptContent,
                messages: conversations,
                onProgress: (content: string) => {
                    setStreamState((state: any) => {
                        let text = state.streamList[0]?.response || '';
                        text += content;
                        return {
                            stream: true,
                            streamList: [
                                {
                                    response: text,
                                    prompt: values.prompt
                                }
                            ]
                        };
                    });
                    setLoading(false);
                }
            });
            setLoading(false);
            setMessageList((list) => [
                ...list,
                {
                    prompt: values.prompt,
                    response
                }
            ]);
            if (promptMemo.conversation) {
                setConversations((list) => [
                    ...list,
                    {
                        role: 'user',
                        content: values.prompt
                    }
                ]);
            }
            setStreamState({
                stream: false,
                streamList: []
            });
        } catch (err: any) {
            const error = isString(err) ? err : JSON.stringify(err);
            setLoading(false);
            setMessageList((list) => [
                ...list,
                {
                    prompt: values.prompt,
                    error
                }
            ]);
            setStreamState({
                stream: false,
                streamList: []
            });
        }
    };

    useMount(() => {
        // @ts-ignore
        const { questionAnswer } = window;
        // 从首页搜索过来的
        if (feature === 'questionAnswer' && questionAnswer) {
            // @ts-ignore
            window.questionAnswer = null;
            onSend({ prompt: questionAnswer });
        }
    });

    if (!promptMemo) {
        return null;
    }

    return (
        <div>
            <div className={styles.container}>
                <FieldRender
                    schema={promptMemo.schema}
                    onSend={onSend}
                    loading={loading}
                    initialValues={promptMemo.initialValues}
                    messageList={messageList}
                    title={promptMemo.title}
                    description={promptMemo.description}
                    stream={streamState.stream}
                    streamList={streamState.streamList}
                />
            </div>
        </div>
    );
};

export default Index;
