import MarkdownView from '@/components/markdownView';
import { isEmptyArray } from '@pigjs/utils';
import { Avatar, List } from 'antd';
import React, { Fragment } from 'react';

import styles from './index.less';

export type MessageListType = {
    response?: string;
    prompt: string;
    error?: string;
};

export interface MessageListProps {
    messageList: MessageListType[];
    loading: boolean;
    stream: boolean;
    streamList: MessageListType[];
}

const RenderItem = (props) => {
    const { item, index } = props;
    console.log(item, 'item');
    return (
        <Fragment key={index}>
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#19c37d' }}>BA</Avatar>}
                    title={<span style={{ color: '#fff' }}>{item.prompt}</span>}
                    className={styles.messageList_userItem}
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: 'rgb(16, 163, 127)' }}>CH</Avatar>}
                    title={
                        item.error ? (
                            <span style={{ color: '#ef4146' }}>{item.error}</span>
                        ) : (
                            <span style={{ color: '#fff', display: 'inline-block' }}>
                                <MarkdownView source={item.response} />
                            </span>
                            // @ts-ignore
                        )
                    }
                    className={styles.messageList_systemItem}
                />
            </List.Item>
        </Fragment>
    );
};

const Index = (props: MessageListProps) => {
    const { messageList = [], loading, stream, streamList = [] } = props;

    return (
        <div className={styles.messageList}>
            {stream && isEmptyArray(messageList) ? null : (
                <List
                    style={{ width: '100%' }}
                    dataSource={messageList}
                    itemLayout='horizontal'
                    locale={{ emptyText: <span style={{ color: '#fff' }}>暂无消息</span> }}
                    loading={loading}
                    renderItem={(item, index) => <RenderItem item={item} index={index} />}
                />
            )}
            {stream && (
                <List
                    style={{ width: '100%' }}
                    dataSource={streamList}
                    itemLayout='horizontal'
                    locale={{ emptyText: <span style={{ color: '#fff' }}>暂无消息</span> }}
                    renderItem={(item, index) => <RenderItem item={item} index={index} />}
                />
            )}
        </div>
    );
};

export default React.memo(Index);
