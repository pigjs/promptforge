import { getSecretkey, updateSecretkey } from '@/services/forge';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal, Space } from 'antd';
import { useRef } from 'react';
import AddSecretkey from './components/addSecretkey';

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

/** 处理密钥状态 启用/禁用 */
function handleSecretkeyStatus(deleted: 0 | 1, id: string, reload: () => void) {
    Modal.confirm({
        title: '温馨提示',
        content: deleted === 0 ? '确定禁用该密钥吗？' : '确定启用该密钥吗？',
        onOk: async () => {
            await updateSecretkey({ deleted, id });
            message.success('操作成功');
            reload();
        }
    });
}

type GithubIssueItem = {
    id: string;
    username: string;
    password: string;
    apiKey: string;
    balance: number;
    deleted: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        render: (data, row, index) => {
            return index + 1;
        }
    },
    {
        title: '账号',
        align: 'center',
        dataIndex: 'username',
        copyable: true
    },
    {
        title: '密码',
        align: 'center',
        dataIndex: 'password',
        copyable: true
    },
    {
        title: '密钥',
        align: 'center',
        dataIndex: 'apiKey',
        copyable: true
    },
    {
        title: '余额',
        align: 'center',
        dataIndex: 'balance'
    },
    {
        title: '状态',
        align: 'center',
        valueEnum: {
            0: '禁用',
            1: '正常'
        },
        dataIndex: 'deleted'
    },
    {
        title: '操作',
        align: 'center',
        dataIndex: 'caozuo',
        render: (data, row, index, action) => {
            const reload = () => {
                action?.reload();
            };
            return (
                <Space>
                    {/* <a>编辑</a> */}
                    {row.deleted === 0 && (
                        <a style={{ color: '#1677ff' }} onClick={() => handleSecretkeyStatus(1, row.id, reload)}>
                            启用
                        </a>
                    )}
                    {row.deleted === 1 && (
                        <a style={{ color: '#FF4D4F' }} onClick={() => handleSecretkeyStatus(0, row.id, reload)}>
                            禁用
                        </a>
                    )}
                </Space>
            );
        }
    }
];

export default () => {
    const actionRef = useRef<ActionType>();

    const getData = async (params = {}) => {
        const { pageSize, current: pageNo } = params;
        // @ts-ignore
        const res = await getSecretkey({
            pageSize,
            pageNo
        });
        return {
            data: res.data || [],
            success: true,
            total: res.headers['x-pagination-count']
        };
    };

    return (
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            bordered
            request={getData}
            pagination={{}}
            headerTitle='密钥管理'
            rowKey='id'
            search={false}
            toolBarRender={() => [
                // <Button
                //     key='button'
                //     icon={<PlusOutlined />}
                //     onClick={() => {
                //         actionRef.current?.reload();
                //     }}
                //     type='primary'
                // >
                //     添加密钥
                // </Button>
                <AddSecretkey onOk={() => actionRef.current?.reload()} />
            ]}
        />
    );
};
