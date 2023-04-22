import FieldRender from '@/components/fieldRender';
import prompt from '@/prompt';
import { performQueryStream } from '@/services/performQueryStream';
import { isFunction, useMount, useSetState, useUrlParam } from '@pigjs/utils';
import React from 'react';

import type { MessageListType } from '@/components/fieldRender';

import styles from './index.less';

const Index = () => {
    const [state, setState] = useSetState({
        // 响应信息
        response: null,
        // 响应错误
        error: null,
        loading: false
    });
    const [messageList, setMessageList] = React.useState<MessageListType[]>([]);
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
            // @ts-ignore
            setState({ loading: true });
            const { response } = await performQueryStream({
                userPrompt: userPromptContent,
                systemPrompt: systemPromptContent,
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
                    // @ts-ignore
                    setState({ loading: false });
                }
            });
            setState({
                // @ts-ignore
                response,
                error: null,
                loading: false
            });
            setMessageList((list) => [
                ...list,
                {
                    prompt: values.prompt,
                    response
                }
            ]);
            setStreamState({
                stream: false,
                streamList: []
            });
        } catch (error: any) {
            // @ts-ignore
            setState({
                response: null,
                error,
                loading: false
            });
            setMessageList((list) => [
                ...list,
                {
                    prompt: userPrompt,
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
                    loading={state.loading}
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
