import MarkdownView from '@/components/markdownView';
import { isEmptyArray } from '@pigjs/utils';
import { Avatar, List } from 'antd';
import React, { Fragment } from 'react';

import styles from './index.less';

export interface MessageType {
    role: 'user' | 'assistant';
    content?: string;
    error?: string;
}

export interface MessageListProps {
    messageList: MessageType[];
    stream: boolean;
    streamMessage?: MessageType;
}

const RenderItem = (props: { item: MessageType; index: number }) => {
    const { item, index } = props;
    return (
        <Fragment key={index}>
            {item.role === 'user' ? (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#19c37d' }}>BA</Avatar>}
                        title={<span style={{ color: '#fff' }}>{item.content}</span>}
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
                                <span style={{ color: '#fff', display: 'inline-block' }}>
                                    <MarkdownView source={item.content!} />
                                </span>
                                // @ts-ignore
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
    const { messageList = [], stream, streamMessage } = props;

    return (
        <div className={styles.messageList}>
            {stream && isEmptyArray(messageList) ? null : (
                <List
                    style={{ width: '100%' }}
                    dataSource={messageList}
                    itemLayout='horizontal'
                    locale={{ emptyText: <span style={{ color: '#fff' }}>暂无消息</span> }}
                    renderItem={(item, index) => <RenderItem item={item} index={index} />}
                />
            )}
            {stream && streamMessage && (
                <List
                    style={{ width: '100%' }}
                    dataSource={[streamMessage]}
                    itemLayout='horizontal'
                    locale={{ emptyText: <span style={{ color: '#fff' }}>暂无消息</span> }}
                    renderItem={(item, index) => <RenderItem item={item} index={index} />}
                />
            )}
        </div>
    );
};

export default React.memo(Index);
