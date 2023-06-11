import { usePromptStorage } from '@/hooks/usePromptStorage';
import { DateFormatEnum } from '@/utils/dateFormat';
import { generateId } from '@/utils/generateId';
import { LocalStorage, LocalStorageKey } from '@/utils/localStorage';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Divider, Drawer, FloatButton, message, Modal, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useModel } from 'umi';

import styles from './index.less';

export interface SidebarProps {
    onChange: (id?: string) => void;
    activeKey?: string;
}

export interface CompletionsType {
    id: string;
    name: string;
    createDate: string;
    updateDate: string;
}

const Index = (props: SidebarProps, ref) => {
    const { activeKey } = props;

    const { mobile } = useModel('uaModel');

    const [open, setOpen] = React.useState(false);

    const [completions = [], setCompletions] = usePromptStorage<CompletionsType>('completions');

    const setName = (id: string, name: string, isMessage = true) => {
        const val = name.trim();
        const resetCompletions = completions.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    name: val
                };
            }
            return item;
        });
        setCompletions(resetCompletions);
        if (isMessage) {
            message.success('修改成功');
        }
    };

    const onChange = (id?: string) => {
        LocalStorage.set(LocalStorageKey.activeCompletions, id);
        props.onChange(id);
    };

    const addCompletion = () => {
        Modal.confirm({
            title: '温馨提示',
            content: '确定创建新聊天吗？',
            onOk: () => {
                const completion = {
                    id: generateId(),
                    name: 'New chat',
                    createDate: dayjs().format(DateFormatEnum.date),
                    updateDate: dayjs().format(DateFormatEnum.date)
                };
                setCompletions((state) => [...state, completion]);
                onChange(completion.id);
                message.success('创建成功');
            }
        });
    };

    React.useImperativeHandle(ref, () => {
        return {
            setName,
            addCompletion
        };
    });
    const delCompletion = (id: string) => {
        Modal.confirm({
            title: '温馨提示',
            content: '确定删除该聊天吗？',
            onOk: () => {
                const resetCompletions = completions.filter((item) => item.id !== id);
                setCompletions(resetCompletions);
                onChange(undefined);
                message.success('删除成功');
            }
        });
    };

    const onSelect = (id: string) => {
        if (id !== activeKey) {
            Modal.confirm({
                title: '温馨提示',
                content: '确定切换到该聊天吗？',
                onOk: () => {
                    onChange(id);
                    message.success('切换成功');
                }
            });
        }
    };

    const layout = (child) => {
        if (mobile) {
            return (
                <div className={styles.sidebar_warp}>
                    <Drawer
                        title='聊天列表'
                        placement='left'
                        closable={false}
                        onClose={() => setOpen(false)}
                        open={open}
                    >
                        {child}
                    </Drawer>
                    <FloatButton icon={<SettingOutlined />} shape='circle' onClick={() => setOpen(true)} />
                </div>
            );
        }
        return child;
    };

    return layout(
        <>
            <div className={`${styles.sidebar} ${mobile ? styles.mobile : ''}`}>
                <div className={styles.sidebar_add} onClick={addCompletion}>
                    <Space>
                        <PlusOutlined />
                        <span>创建聊天</span>
                    </Space>
                </div>
                {completions.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={`${styles.sidebar_item} ${
                                activeKey === item.id ? styles.sidebar_item_active : ''
                            }`}
                        >
                            <span
                                onClick={() => onSelect(item.id)}
                                className={`${styles.sidebar_item_name} ellipsis`}
                                title={item.name}
                            >
                                {item.name}
                            </span>
                            {activeKey === item.id && (
                                <Space className={styles.sidebar_item_right}>
                                    <ModalForm<{ name: string }>
                                        trigger={<EditOutlined className={styles.sidebar_item_icon} />}
                                        title='修改名称'
                                        autoFocusFirstInput
                                        modalProps={{
                                            destroyOnClose: true,
                                            maskClosable: false,
                                            width: 500
                                        }}
                                        // @ts-ignore
                                        onFinish={(values) => {
                                            setName(item.id, values.name);
                                            return true;
                                        }}
                                    >
                                        <ProFormText
                                            rules={[
                                                { required: true, whitespace: true, message: '请输入名称' },
                                                { max: 20, message: '名称最长为 20 位' }
                                            ]}
                                            name='name'
                                            placeholder='请输入名称'
                                        />
                                    </ModalForm>
                                    <DeleteOutlined
                                        onClick={() => {
                                            delCompletion(item.id);
                                        }}
                                        className={styles.sidebar_item_icon}
                                    />
                                </Space>
                            )}
                        </div>
                    );
                })}
            </div>
            {!mobile && <Divider type='vertical' />}
        </>
    );
};

export default React.forwardRef(Index);
