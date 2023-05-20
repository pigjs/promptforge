import { getForgeList } from '@/services/forge';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';

const Index = () => {
    const { initialState } = useModel('@@initialState');

    const { categoryEnum } = initialState;

    const getData = async (params = {}) => {
        const { pageSize, current: pageNo, ...resetParams } = params;
        const data = {
            pageSize,
            pageNo,
            ...resetParams
        };
        const res = await getForgeList(data);
        return {
            data: res.data || [],
            success: true,
            total: res.headers['x-pagination-count']
        };
    };

    const openCreatePage = () => {
        history.push('/forge/create');
    };

    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <ProList
                pagination={{}}
                search={{}}
                request={getData}
                grid={{ gutter: 16, column: 3 }}
                toolBarRender={() => [
                    <Button type='primary' key='primary' onClick={openCreatePage}>
                        创建应用
                    </Button>
                ]}
                onItem={(item) => ({
                    onClick: () => history.push(`/feature?id=${item.id}`)
                })}
                // itemCardProps={{ ghost: true }}
                metas={{
                    title: {
                        dataIndex: 'name',
                        fieldProps: {
                            placeholder: '请输入应用名称进行搜索'
                        }
                    },
                    subTitle: {
                        dataIndex: 'category',
                        title: '分类',
                        valueEnum: categoryEnum,
                        render: (data) => {
                            return <Tag color='#5BD8A6'>{data}</Tag>;
                        }
                    },
                    content: {
                        dataIndex: 'description',
                        render: (data) => {
                            return <div style={{ height: 50, overflow: 'auto' }}>{data}</div>;
                        },
                        search: false
                    },
                    actions: {
                        cardActionProps: 'actions',
                        render: (data, row) => {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        boxSizing: 'border-box',
                                        padding: '0 24px'
                                    }}
                                >
                                    <span>作者：{row.user.username}</span>
                                    <span>{row.count}次使用</span>
                                </div>
                            );
                        }
                    }
                }}
            />
        </div>
    );
};

export default Index;
