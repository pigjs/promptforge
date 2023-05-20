import { statusColorEnum, statusEnum } from '@/enums/feature';
import { useLogin } from '@/hooks/useLogin';
import { getUserForgeList } from '@/services/forge';
import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';

const Index = () => {
    const { initialState } = useModel('@@initialState');

    const { categoryEnum, categoryColorEnum } = initialState;

    const getData = async (params = {}) => {
        const { pageSize, current: pageNo, ...resetParams } = params;
        const data = {
            pageSize,
            pageNo,
            ...resetParams
        };
        const res = await getUserForgeList(data);
        return {
            data: res.data || [],
            success: true,
            total: res.headers['x-pagination-count']
        };
    };

    const openCreatePage = useLogin(
        () => {
            history.push('/forge/create');
        },
        { content: '您需要登录才能创建应用。登录后，您可以访问更多功能和服务，以及享受更好的个性化体验' }
    );

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
                metas={{
                    title: {
                        dataIndex: 'name',
                        fieldProps: {
                            placeholder: '请输入应用名称进行搜索'
                        }
                    },
                    subTitle: {
                        dataIndex: 'category',
                        render: (data, row) => {
                            return (
                                <Space>
                                    <Tag color={categoryColorEnum[data]}>{categoryEnum[data]}</Tag>
                                    <Tag color={statusColorEnum[row.status]}>{statusEnum[row.status]}</Tag>
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
                        render: (_data, row) => {
                            const status = row.status as unknown as string;
                            if (['1'].includes(status)) {
                                return <div style={{ color: '#333' }}>{row.count}次使用</div>;
                            }
                            if (['2', '3'].includes(status)) {
                                return <div onClick={() => history.push(`/forge/create?id=${row.id}`)}>编辑</div>;
                            }
                            if (['4'].includes(status)) {
                                return <div style={{ color: '#333' }}>系统审核中，请耐心等待！</div>;
                            }
                            return null;
                        }
                    }
                }}
            />
        </div>
    );
};

export default Index;
