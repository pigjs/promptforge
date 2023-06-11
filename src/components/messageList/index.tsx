import MarkdownView from '@/components/markdownView';
import { isEmptyArray } from '@pigjs/utils';
import { Avatar, List } from 'antd';
import React, { Fragment } from 'react';

import styles from './index.less';

export enum RoleEnum {
    user = 'user',
    assistant = 'assistant',
    system = 'system'
}

export interface MessageType {
    id?: string;
    role: RoleEnum;
    content?: string;
    error?: string;
    usedTokens?: number;
}

export interface MessageListProps {
    messageList: MessageType[];
    loading: boolean;
    streamMessage?: MessageType;
    streamLoading: boolean;
}

const RenderItem = (props: { item: MessageType; index: number; loading?: boolean }) => {
    const { item, index, loading } = props;
    return (
        <Fragment key={index}>
            {item.role === 'user' ? (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#19c37d' }}>BA</Avatar>}
                        title={
                            <span style={{ color: '#fff', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                                {item.content}
                            </span>
                        }
                        className={styles.messageList_userItem}
                    />
                </List.Item>
            ) : null}
            {item.role === 'assistant' ? (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: 'rgb(16, 163, 127)' }}>CH</Avatar>}
                        title={
                            item.error ? (
                                <span style={{ color: '#ef4146' }}>{item.error}</span>
                            ) : (
                                <span
                                    style={{
                                        color: '#fff',
                                        wordWrap: 'break-word',
                                        display: 'inline-block'
                                    }}
                                >
                                    <MarkdownView loading={loading} source={item.content!} />
                                </span>
                            )
                        }
                        className={styles.messageList_systemItem}
                    />
                </List.Item>
            ) : null}
        </Fragment>
    );
};

const Index = (props: MessageListProps) => {
    const { messageList = [], streamMessage, loading, streamLoading } = props;

    return (
        <div className={styles.messageList}>
            {loading && isEmptyArray(messageList) ? null : (
                <List
                    style={{ width: '100%' }}
                    dataSource={messageList}
                    itemLayout='horizontal'
                    locale={{ emptyText: <span style={{ color: '#fff' }}>暂无消息</span> }}
                    renderItem={(item, index) => <RenderItem item={item} index={index} />}
                />
            )}
            {loading && streamMessage && (
                <List
                    style={{ width: '100%' }}
                    dataSource={[streamMessage]}
                    itemLayout='horizontal'
                    locale={{ emptyText: <span style={{ color: '#fff' }}>暂无消息</span> }}
                    renderItem={(item, index) => <RenderItem loading={streamLoading} item={item} index={index} />}
                />
            )}
        </div>
    );
};

export default React.memo(Index);
