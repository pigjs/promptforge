import { useDialog } from '@/components/dialog';
import loginDialog from '@/components/loginDialog';
import MessageList from '@/components/messageList';
import { usePromptStorage } from '@/hooks/usePromptStorage';
import { usePrompt } from '@/hooks/userPrompt';
import { getCompletionsInfo } from '@/services/forge';
import { performQueryStream } from '@/services/performQueryStream';
import { eventHub } from '@/utils/eventHub';
import { isEnterKey } from '@/utils/keyCode';
import { getTour, setTour } from '@/utils/user';
import SendOutlined from '@ant-design/icons/SendOutlined';
import { isString, useEvent, useMount, useUnmount, useUrlParam } from '@pigjs/utils';
import { Divider, Input, Tour } from 'antd';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useModel } from 'umi';
import Sidebar from './sidebar';

import styles from './index.less';

import type { FieldProps } from '@/components/field';
import type { MessageType } from '@/components/messageList';
import type { BaseForge } from '@/services/types/forge';
import type { FormInstance, TourProps } from 'antd';

const { TextArea } = Input;

export interface PromptRenderProps {
    promptInfo: Pick<BaseForge, 'id' | 'category' | 'count' | 'description' | 'icon' | 'color' | 'name' | 'user'> & {
        initialValues?: Record<string, any>;
        schema?: FieldProps[];
    };
    id: string;
}

const promptOptions = {
    content: '您当前处于未登录状态，离开页面后，您的聊天记录将不会保存。如果您希望保存聊天记录，请登录后再离开页面',
    okText: '前往登录',
    cancelText: '仍然离开'
};

const Index = (props: PromptRenderProps) => {
    const { promptInfo, id } = props;
    const { schema, initialValues } = promptInfo;

    const { mobile } = useModel('uaModel');

    const fieldRenderRef = React.useRef<FormInstance>(null);
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const ref1 = React.useRef();
    const ref2 = React.useRef();
    const ref3 = React.useRef();

    const [streamMessage, setStreamMessage] = React.useState<MessageType>();
    const [stream, setStream] = React.useState(false);
    const preview = useUrlParam('preview');
    const [messageList = [], setMessageList, loginSetState] = usePromptStorage(id, preview !== 'true');

    const [loginShow] = useDialog(loginDialog);

    const { cancelUnblock } = usePrompt({
        ...promptOptions,
        onOk: () => {
            loginShow();
        },
        onCancel: (actionCallback) => actionCallback()
    });

    const loginSuccess = useEvent(() => {
        cancelUnblock();
        loginSetState();
    });

    useMount(() => {
        eventHub.on('login', loginSuccess);
    });

    useUnmount(() => {
        eventHub.off('login', loginSuccess);
    });

    useMount(() => {
        if (!getTour()) {
            setTimeout(() => {
                setOpen(true);
            }, 1000);
        }
        // const userInfo = getUserInfo();
        // // 已经登录的，取消页面拦截
        // if (userInfo.userId) {
        //     cancelUnblock();
        // }
    });

    const baseSteps: TourProps['steps'] = mobile
        ? [
              {
                  title: '应用设置',
                  description: '点击这里，这里可以查看应用说明，及使用示例，同时可以根据自己的需要，选择不同的配置项',
                  target: () => ref1.current
              }
          ]
        : [
              {
                  title: '应用描述',
                  description: '这里可以查看应用说明，及使用示例',
                  target: () => ref1.current
              },
              {
                  title: '应用设置',
                  description: '可以根据自己的需要，选择不同的配置项',
                  target: () => ref2.current
              }
          ];

    const steps: TourProps['steps'] = [
        ...baseSteps,
        {
            title: '发送消息',
            description: '输入内容，按回车键发送或点击发送图标，即可发送消息',
            target: () => ref3.current
        }
    ];

    const closeTour = () => {
        setOpen(false);
        setTour(true);
    };

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
            setStreamMessage({
                role: 'assistant',
                content: ''
            });
            setStream(true);
            const res = await getCompletionsInfo({ id, userPromptOptions: values });
            const { data } = res;
            const { response } = await performQueryStream({
                userPromptOptions: values,
                content: data,
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
        if (event && !isEnterKey(event)) {
            return;
        }
        const values = await fieldRenderRef.current?.validateFields();
        onSend?.({ ...values, prompt: value });
        setValue('');
    };

    const messageListProps = {
        messageList,
        stream,
        streamMessage,
        loading
    };

    return (
        <div className={styles.promptRender}>
            {/* <div className={styles.promptRender_left}>
                <div className={styles.promptRender_left_title}>{promptInfo.name}</div>
                <div className={styles.promptRender_left_description}>
                    {promptInfo.description}
                </div>
                <Divider />
                {schema ? (
                    <FieldRender
                        ref={fieldRenderRef}
                        layout='vertical'
                        schema={schema}
                        initialValues={initialValues}
                        wrapperCol={{ span: 24 }}
                    />
                ) : null}
            </div> */}
            <Sidebar
                ref1={ref1}
                ref2={ref2}
                schema={schema}
                initialValues={initialValues}
                promptInfo={promptInfo}
                ref={fieldRenderRef}
            />
            {!mobile && <Divider type='vertical' />}
            <div className={styles.promptRender_right}>
                <div className={styles.promptRender_right_messageList}>
                    {/* <Spin spinning={loading}> */}
                    <div style={{ height: '100%' }}>
                        <ScrollableFeed>
                            <MessageList {...messageListProps} />
                        </ScrollableFeed>
                    </div>
                    {/* </Spin> */}
                </div>

                <div className={styles.promptRender_right_send} ref={ref3}>
                    <TextArea
                        onKeyDown={onPressEnter}
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        disabled={loading}
                        placeholder='Send a message...'
                        size='large'
                        value={value}
                        onChange={onChange}
                    />
                    <div className={styles.promptRender_right_send_iconBox} onClick={() => onPressEnter()}>
                        <SendOutlined className={styles.promptRender_right_send_icon} />
                    </div>
                </div>
            </div>
            <Tour open={open} onClose={closeTour} steps={steps} />
        </div>
    );
};

export default React.memo(Index);
