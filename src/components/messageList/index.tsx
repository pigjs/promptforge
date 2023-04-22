import MarkdownView from '@/components/markdownView';
import { isEmptyArray } from '@pigjs/utils';
import { Avatar, List } from 'antd';
import React, { Fragment } from 'react';

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

const Index = (props: MessageListProps) => {
    const { messageList = [], loading, stream, streamList = [] } = props;

    return (
        <div style={{ width: '100%' }}>
            {stream && isEmptyArray(messageList) ? null : (
                <List
                    style={{ width: '100%' }}
                    dataSource={messageList}
                    itemLayout='horizontal'
                    locale={{ emptyText: '暂无消息' }}
                    loading={loading}
                    renderItem={(item, index) => {
                        return (
                            <Fragment key={index}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: '#87d068' }}>BA</Avatar>}
                                        title={item.prompt}
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: 'rgb(22, 129, 255)' }}>CH</Avatar>}
                                        title={
                                            item.error ? (
                                                <span style={{ color: '#ef4146' }}>{item.error}</span>
                                            ) : (
                                                // @ts-ignore
                                                <MarkdownView source={item.response} />
                                            )
                                        }
                                    />
                                </List.Item>
                            </Fragment>
                        );
                    }}
                />
            )}
            {stream && (
                <List
                    style={{ width: '100%' }}
                    dataSource={streamList}
                    itemLayout='horizontal'
                    locale={{ emptyText: '暂无消息' }}
                    renderItem={(item, index) => {
                        return (
                            <Fragment key={index}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: '#87d068' }}>BA</Avatar>}
                                        title={item.prompt}
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: 'rgb(22, 129, 255)' }}>CH</Avatar>}
                                        title={
                                            item.error ? (
                                                <span style={{ color: '#ef4146' }}>{item.error}</span>
                                            ) : (
                                                // @ts-ignore
                                                <MarkdownView source={item.response} />
                                            )
                                        }
                                    />
                                </List.Item>
                            </Fragment>
                        );
                    }}
                />
            )}
        </div>
    );
};

export default React.memo(Index);
