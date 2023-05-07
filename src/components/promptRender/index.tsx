import FieldRender from '@/components/fieldRender';
import MessageList from '@/components/messageList';
import { useStorage } from '@/hooks/useStorge';
import { performQueryStream } from '@/services/performQueryStream';
import { isEnterKey } from '@/utils/keyCode';
import { isString } from '@pigjs/utils';
import { Divider, Input, Spin } from 'antd';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';

import styles from './index.less';

import type { FieldProps } from '@/components/field';
import type { MessageType } from '@/components/messageList';
import type { BaseForge } from '@/services/types/forge';
import type { FormInstance } from 'antd';

const { TextArea } = Input;

export interface PromptRenderProps {
    promptInfo: Pick<BaseForge, 'id' | 'category' | 'count' | 'description' | 'icon' | 'color' | 'name' | 'user'> & {
        initialValues?: Record<string, any>;
        schema?: FieldProps[];
    };
    id: string;
}

const Index = (props: PromptRenderProps) => {
    const { promptInfo, id } = props;
    const { schema, initialValues } = promptInfo;

    const fieldRenderRef = React.useRef<FormInstance>(null);
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const [streamMessage, setStreamMessage] = React.useState<MessageType>();
    const [stream, setStream] = React.useState(false);
    const [messageList = [], setMessageList] = useStorage<MessageType[]>(id);

    const onChange = (e: any) => {
        const val = e.target.value;
        setValue(val);
    };

    const onSend = async (values: Record<string, any>) => {
        try {
            // @ts-ignore
            setMessageList((list = []) => [
                ...list,
                {
                    role: 'user',
                    content: values.prompt
                }
            ]);
            setLoading(true);
            const { response } = await performQueryStream({
                id,
                userPromptOptions: values,
                onProgress: (content) => {
                    setStreamMessage((state) => {
                        const prevContent = state?.content || '';
                        return {
                            role: 'assistant',
                            content: prevContent + content
                        };
                    });
                    setStream(true);
                    setLoading(false);
                }
            });
            setStream(false);
            setStreamMessage(undefined);
            // @ts-ignore
            setMessageList((list = []) => [
                ...list,
                {
                    role: 'assistant',
                    content: response
                }
            ]);
            setLoading(false);
        } catch (err) {
            const error = isString(err) ? err : JSON.stringify(err);
            setLoading(false);
            // @ts-ignore
            setMessageList((list = []) => [
                ...list,
                {
                    role: 'assistant',
                    error
                }
            ]);
            setStream(false);
            setStreamMessage(undefined);
        }
    };

    const onPressEnter = async (event: any) => {
        if (!value?.trim()) {
            return;
        }
        if (!isEnterKey(event)) {
            return;
        }
        const values = await fieldRenderRef.current?.validateFields();
        onSend?.({ ...values, prompt: value });
        setValue('');
    };

    const messageListProps = {
        messageList,
        stream,
        streamMessage
    };

    return (
        <div className={styles.promptRender}>
            <div className={styles.promptRender_left}>
                <div className={styles.promptRender_left_title}>{promptInfo.name}</div>
                <div className={styles.promptRender_left_description}>{promptInfo.description}</div>
                <Divider />
                {schema ? (
                    <FieldRender
                        ref={fieldRenderRef}
                        layout='vertical'
                        schema={schema}
                        initialValues={initialValues}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                    />
                ) : null}
            </div>
            <Divider type='vertical' />
            <div className={styles.promptRender_right}>
                <div className={styles.promptRender_right_messageList}>
                    <Spin spinning={loading}>
                        <ScrollableFeed>
                            <MessageList {...messageListProps} />
                        </ScrollableFeed>
                    </Spin>
                </div>

                <div className={styles.promptRender_right_send}>
                    <TextArea
                        onKeyDown={onPressEnter}
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        disabled={loading}
                        placeholder='Send a message...'
                        size='large'
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Index);
