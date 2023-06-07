import { useLogin } from '@/hooks/useLogin';
import { eventHub } from '@/utils/eventHub';
import { getUserInfo } from '@/utils/user';
import { ProLayout } from '@ant-design/pro-components';
import { useEvent, useMount, useUnmount } from '@pigjs/utils';
import { Dropdown } from 'antd';
import React from 'react';
import { history, Link, Outlet, useLocation } from 'umi';
import Avatar from './avatar';

import type { MenuProps } from 'antd';

const adminItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link to='/admin/forge' key='adminForge'>
                应用管理
            </Link>
        )
    },
    {
        key: '2',
        label: (
            <Link to='/admin/secretkey' key='adminSecretkey'>
                密钥管理
            </Link>
        )
    }
];
const forgeItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link to='/forge' key='forge'>
                应用中心
            </Link>
        )
    },
    {
        key: '2',
        label: (
            <Link to='/feature/billing' key='featureBilling'>
                OpenAI 余额查询
            </Link>
        )
    }
];

export default () => {
    const location = useLocation();
    const { pathname } = location;

    const [userInfo, setUserInfo] = React.useState(() => {
        return getUserInfo();
    });

    const loginSuccess = useEvent(() => {
        const userInfo = getUserInfo();
        setUserInfo(userInfo);
    });

    const logout = () => {
        setUserInfo({});
    };

    useMount(() => {
        eventHub.on('login', loginSuccess);
        eventHub.on('logout', logout);
    });

    useUnmount(() => {
        eventHub.off('login', loginSuccess);
        eventHub.off('logout', logout);
    });

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
