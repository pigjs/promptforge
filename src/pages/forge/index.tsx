import ProList from '@/components/proList';
import { getForgeList } from '@/services/forge';
import { LocalStorage, LocalStorageKey } from '@/utils/localStorage';
import { Alert, Button, Space, Tag } from 'antd';
import React from 'react';
import { history, Link, useModel } from 'umi';

import styles from './index.less';

const Index = () => {
    const { initialState } = useModel('@@initialState');
    const { mobile } = useModel('uaModel');

    const { categoryEnum, categoryOptions = [] } = initialState;

    const [selectedTags, setSelectedTags] = React.useState<string[]>(() => {
        return LocalStorage.get(LocalStorageKey.selectedTags) || [];
    });
    const [params, setParams] = React.useState(() => {
        const tags: any[] = LocalStorage.get(LocalStorageKey.selectedTags);
        if (tags) {
            return {
                category: tags.join(',')
            };
        }
        return {};
    });

    const actionRef = React.useRef(null);

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

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
        setParams({
            category: nextSelectedTags.join(',')
        });
        LocalStorage.set(LocalStorageKey.selectedTags, nextSelectedTags);
    };

    return (
        <>
            <Alert
                type='info'
                showIcon
                message={
                    <span>
                        支持上下文会话的聊天功能已经上线了，
                        <Link to='/feature/completion' style={{ color: '#000', textDecoration: 'underline' }}>
                            去体验
                        </Link>
                    </span>
                }
                style={{ marginBottom: 10 }}
            />
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.header_title}>Prompt工坊</h1>
                    <p className={styles.header_subtitle}>让生产力加倍的 ai 应用平台</p>
                    <Button className={styles.header_create} type='primary' onClick={openCreatePage}>
                        创建我的应用
                    </Button>
                </div>
                <div className={`${styles.tags} ${mobile ? styles.tags_mobile : ''}`}>
                    <Space size={[8, 8]} wrap>
                        {categoryOptions.map((tag) => (
                            <div
                                key={tag.id}
                                className={`${styles.tags_tag} ${
                                    selectedTags.includes(tag.id) ? styles.tags_tag_checked : ''
                                } `}
                                // checked={selectedTags.includes(tag.id)}
                                onClick={() => handleChange(tag.id, !selectedTags.includes(tag.id))}
                            >
                                {tag.name}
                            </div>
                        ))}
                    </Space>
                </div>
                <ProList
                    params={params}
                    request={getData}
                    search={false}
                    pagination={{ pageSize: 12 }}
                    actionRef={actionRef}
                    onItem={(item) => ({
                        onClick: () => history.push(`/feature?id=${item.id}`)
                    })}
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
        </>
    );
};

export default Index;
