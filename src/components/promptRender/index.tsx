import MessageList from '@/components/messageList';
import { isEnterKey } from '@/utils/keyCode';
import SendOutlined from '@ant-design/icons/SendOutlined';
import { Input } from 'antd';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useModel } from 'umi';

import styles from './index.less';

import type { MessageType } from '@/components/messageList';

const { TextArea } = Input;

export interface PromptRenderProps {
    dataSource: MessageType[];
    streamMessage?: MessageType;
    loading: boolean;
    onSend: (value: string) => void;
    streamLoading: boolean;
    sendMessageRef?: any;
}

const Index = (props: PromptRenderProps) => {
    const { dataSource, streamMessage, loading, onSend, streamLoading, sendMessageRef } = props;

    const { mobile } = useModel('uaModel');

    const [value, setValue] = React.useState('');

    const onChange = (e: any) => {
        const val = e.target.value;
        setValue(val);
    };

    const onPressEnter = async (event?: any) => {
        if (!value?.trim()) {
            return;
        }
        if (event && !isEnterKey(event)) {
            return;
        }
        onSend(value);
        setValue('');
    };

    const messageListProps = {
        messageList: dataSource,
        streamMessage,
        loading,
        streamLoading
    };

    return (
        <div className={styles.promptRender}>
            <div className={styles.promptRender_messageList}>
                <div style={{ height: '100%' }}>
                    <ScrollableFeed>
                        <MessageList {...messageListProps} />
                    </ScrollableFeed>
                </div>
            </div>

            <div className={styles.promptRender_send} ref={sendMessageRef}>
                <TextArea
                    onKeyDown={onPressEnter}
                    autoSize={{ minRows: 1, maxRows: 2 }}
                    disabled={loading}
                    placeholder='Send a message...'
                    size='large'
                    value={value}
                    onChange={onChange}
                />
                <div
                    className={`${mobile ? styles.promptRender_send_icon_mobile : styles.promptRender_send_icon_web}`}
                    onClick={() => onPressEnter()}
                >
                    <SendOutlined className={styles.promptRender_send_icon} />
                </div>
            </div>
        </div>
    );
};

export default Index;
