import { statusColorEnum, statusEnum } from '@/enums/feature';
import { approvePass, getAllList } from '@/services/forge';
import { ProList } from '@ant-design/pro-components';
import { message, Modal, Space, Tag } from 'antd';
import React from 'react';
import { useModel } from 'umi';

import styles from './index.less';

import type { ActionType } from '@ant-design/pro-components';

const Index = () => {
    const { initialState } = useModel('@@initialState');

    const { categoryEnum, categoryColorEnum } = initialState;

    const actionRef = React.useRef<ActionType>();

    const getData = async (params = {}) => {
        const { pageSize, current: pageNo, ...resetParams } = params;
        const data = {
            pageSize,
            pageNo,
            ...resetParams,
            status: 4
        };
        // @ts-ignore
        const res = await getAllList(data);
        return {
            data: res.data || [],
            success: true,
            total: res.headers['x-pagination-count']
        };
    };

    const handleApprovePass = (id) => {
        Modal.confirm({
            title: '温馨提示',
            content: '是否通过审核？',
            onOk: async () => {
                await approvePass(id);
                await actionRef.current?.reload();
                message.success('操作成功');
            }
        });
    };

    return (
        <div className={styles.page}>
            <ProList
                actionRef={actionRef}
                pagination={{}}
                search={{}}
                request={getData}
                grid={{ gutter: 16, column: 3 }}
                headerTitle='待审核应用'
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
                            return (
                                <div className='ellipsis_3' style={{ minHeight: 66 }}>
                                    {data}
                                </div>
                            );
                        },
                        search: false
                    },
                    actions: {
                        cardActionProps: 'actions',
                        render: (_data, row) => {
                            return <div onClick={() => handleApprovePass(row.id)}>审核通过</div>;
                        }
                    }
                }}
            />
        </div>
    );
};

export default Index;
