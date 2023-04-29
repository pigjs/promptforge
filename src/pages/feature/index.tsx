// import FieldRender from '@/components/fieldRender';
// import prompt from '@/prompt';
import PromptRender from '@/components/promptRender';
import { getDetail } from '@/services/forge';
import { performQueryStream } from '@/services/performQueryStream';
import { isFunction, isString, useMount, useSetState, useUrlParam } from '@pigjs/utils';
import { Modal } from 'antd';
import React from 'react';

import type { ConversationType, MessageListType } from '@/components/fieldRender';

// import styles from './index.less';

const Index = () => {
    const [loading, setLoading] = React.useState(false);
    const [detail, setDetail] = React.useState(null);
    const [messageList, setMessageList] = React.useState<MessageListType[]>([]);
    const [conversations, setConversations] = React.useState<ConversationType[]>([]);
    const [streamState, setStreamState] = useSetState<any>({
        stream: false,
        streamList: []
    });

    const id = useUrlParam('id');

    const getData = async () => {
        const res = await getDetail(id);
        const data = res.data || {};
        try {
            const { schema, initialValues, prompt, ...otherData } = data;
            const resetPrompt = JSON.parse(prompt);
            const resetData = {
                schema: schema ? JSON.parse(schema) : {},
                initialValues: schema ? JSON.parse(initialValues) : {},
                prompt: resetPrompt,
                ...otherData
            };
            setDetail(resetData);
        } catch (err) {
            console.error('解析工具配置错误：', err);
            Modal.error({
                title: '温馨提示',
                content: '解析工具配置错误，请刷新重试'
            });
        }
    };

    const onSend = async (values: Record<string, any>) => {
        const { userPrompt, systemPrompt } = detail.prompt;
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
            if (detail.conversation) {
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
        getData();
        // // @ts-ignore
        // const { questionAnswer } = window;
        // // 从首页搜索过来的
        // if (feature === 'questionAnswer' && questionAnswer) {
        //     // @ts-ignore
        //     window.questionAnswer = null;
        //     onSend({ prompt: questionAnswer });
        // }
    });

    if (!detail) {
        return null;
    }

    return (
        <div style={{ height: 'calc(100vh - 112px)' }}>
            <PromptRender
                promptInfo={detail}
                onSend={onSend}
                messageList={messageList}
                stream={streamState.stream}
                streamList={streamState.streamList}
                loading={loading}
            />
            {/* <div className={styles.container}>
                <FieldRender
                    schema={detail.schema}
                    onSend={onSend}
                    loading={loading}
                    initialValues={detail.initialValues}
                    messageList={messageList}
                    title={detail.name}
                    description={detail.description}
                    stream={streamState.stream}
                    streamList={streamState.streamList}
                />
            </div> */}
        </div>
    );
};

export default Index;
