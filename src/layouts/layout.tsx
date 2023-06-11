import { useLogin } from '@/hooks/useLogin';
import { ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import React from 'react';
import { history, Link, Outlet, useLocation, useModel } from 'umi';
import Avatar from './avatar';

import type { MenuProps } from 'antd';

const adminItems: MenuProps['items'] = [
    {
        key: 'adminForge',
        label: <Link to='/admin/forge'>应用管理</Link>
    },
    {
        key: 'adminSecretkey',
        label: <Link to='/admin/secretkey'>密钥管理</Link>
    }
];
const forgeItems: MenuProps['items'] = [
    {
        key: 'forge',
        label: <Link to='/forge'>应用中心</Link>
    },
    {
        key: 'featureCompletion',
        label: <Link to='/feature/completion'>Chat 聊天</Link>
    },
    {
        key: 'featureBilling',
        label: <Link to='/feature/billing'>OpenAI 余额查询</Link>
    }
];

export default () => {
    const location = useLocation();
    const { pathname } = location;

    const { userInfo } = useModel('userModel');

    const defaultSettings = {
        // colorPrimary: '#1677FF',
        contentWidth: 'Fluid',
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: false,
        menuHeaderRender: false,
        navTheme: 'light',
        fixedHeader: true,
        menuRender: () => false
    };

    const openMyWorkshopPage = useLogin(
        () => {
            history.push('/forge/myWorkshop');
        },
        { content: '您需要登录才能进入我的应用。登录后，您可以访问更多功能和服务，以及享受更好的个性化体验' }
    );

    return (
        <div id='test-pro-layout'>
            {/* @ts-ignore */}
            <ProLayout
                logo='/logo.jpg'
                title='Prompt工坊'
                token={{
                    pageContainer: {
                        colorBgPageContainer: '#444654'
                    },
                    header: {
                        colorBgHeader: '#202123',
                        colorHeaderTitle: '#fff',
                        colorTextMenu: '#dfdfdf',
                        colorTextMenuSecondary: '#dfdfdf',
                        colorTextMenuSelected: '#fff',
                        colorBgMenuItemSelected: '#202123',
                        colorTextRightActionsItem: '#dfdfdf'
                    },
                    sider: {
                        colorMenuBackground: '#202123',
                        colorTextMenuTitle: '#fff',
                        colorMenuItemDivider: '#fff',
                        colorTextMenuActive: '#fff',
                        colorTextMenuItemHover: '#fff',
                        colorTextMenu: '#fff',
                        colorTextMenuSelected: 'rgba(42,122,251,1)',
                        colorBgMenuItemSelected: '#fff',
                        colorBgCollapsedButton: '#fff'
                    }
                }}
                location={{
                    pathname
                }}
                menu={{
                    type: 'group'
                }}
                avatarProps={{
                    render: () => {
                        return <Avatar userInfo={userInfo} />;
                    }
                }}
                actionsRender={() => [
                    <Dropdown key='forge' menu={{ items: forgeItems }}>
                        <a key='forge'>工作台</a>
                    </Dropdown>,
                    <a onClick={openMyWorkshopPage} key='myWorkshop'>
                        我的应用
                    </a>,
                    userInfo.username === '18268937872' ? (
                        <Dropdown key='admin' menu={{ items: adminItems }}>
                            <a>系统管理</a>
                        </Dropdown>
                    ) : null
                ]}
                onMenuHeaderClick={() => history.push('/')}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            history.push(item.path);
                        }}
                    >
                        {dom}
                    </a>
                )}
                {...defaultSettings}
            >
                <div style={{ minHeight: 'calc(100vh - 104px)' }}>
                    <Outlet />
                </div>
            </ProLayout>
        </div>
    );
};
