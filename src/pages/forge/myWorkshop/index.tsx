import { getUserForgeList } from '@/services/forge';
import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
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
        const res = await getUserForgeList(data);
        console.log(res, 'res');
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
                grid={{ gutter: 16, column: 2 }}
                toolBarRender={() => [
                    <Button type='primary' key='primary' onClick={openCreatePage}>
                        创建应用
                    </Button>
                ]}
                metas={{
                    title: {
                        dataIndex: 'name',
                        fieldProps: {
                            placeholder: '请输入应用名称进行搜索'
                        }
                    },
                    subTitle: {
                        dataIndex: 'category',
                        render: (data) => {
                            return (
                                <Space>
                                    <Tag color='#5BD8A6'>{categoryEnum[data]}</Tag>
                                    <Tag color='#5BD8A6'>已上线</Tag>
                                </Space>
                            );
                        },
                        search: false
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
                        render: () => {
                            return [<a>上线</a>, <a>下线</a>];
                        }
                    }
                }}
            />
        </div>
    );
};

export default Index;
