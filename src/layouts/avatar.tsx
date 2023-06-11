import { useDialog } from '@/components/dialog';
import loginDialog from '@/components/loginDialog';
import UserOutlined from '@ant-design/icons/UserAddOutlined';
import { Dropdown, Modal } from 'antd';
import React from 'react';
import { useModel } from 'umi';

import type { MenuProps } from 'antd';

const Index = () => {
    const [loginShow] = useDialog(loginDialog);

    const { userInfo, logout: logoutSync, loginSuccess } = useModel('userModel');

    const logout = () => {
        Modal.confirm({
            title: '温馨提示',
            content: '是否退出登录？',
            onOk: () => {
                logoutSync();
                window.location.reload();
            }
        });
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <a onClick={logout}>退出登录</a>
        }
    ];

    if (!userInfo.userId) {
        return (
            <div
                onClick={() => loginShow({ loginSuccess })}
                style={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: 16 }}
            >
                <UserOutlined />
                <span style={{ marginLeft: 4 }}>未登录</span>
            </div>
        );
    }

    return (
        <Dropdown menu={{ items }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: 16 }}>
                <UserOutlined />
                <div style={{ marginLeft: 4 }}>{userInfo.username}</div>
            </div>
        </Dropdown>
    );
};

export default React.memo(Index);
