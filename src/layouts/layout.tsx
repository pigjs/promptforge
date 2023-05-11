import { useDialog } from '@/components/dialog';
import loginDialog from '@/components/loginDialog';
import { eventHub } from '@/utils/eventHub';
import { getUserInfo } from '@/utils/user';
import { ProLayout } from '@ant-design/pro-components';
import { useEvent, useMount, useUnmount } from '@pigjs/utils';
import { Modal } from 'antd';
import React from 'react';
import { history, Link, Outlet, useLocation } from 'umi';
import Avatar from './avatar';

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

    const [loginShow] = useDialog(loginDialog);

    useMount(() => {
        eventHub.on('login', loginSuccess);
    });

    useUnmount(() => {
        eventHub.off('login', loginSuccess);
    });

    const defaultSettings = {
        colorPrimary: '#1677FF',
        contentWidth: 'Fluid',
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: false,
        menuHeaderRender: false,
        navTheme: 'light',
        fixedHeader: true,
        menuRender: () => false
    };

    const openMyWorkshopPage = () => {
        if (!userInfo.userId) {
            Modal.confirm({
                title: '温馨提示',
                content: '您需要登录才能进入我的工坊。登录后，您可以访问更多功能和服务，以及享受更好的个性化体验',
                okText: '前往登录',
                cancelText: '取消',
                onOk: () => {
                    loginShow();
                }
            });
        } else {
            history.push('/forge/myWorkshop');
        }
    };

    return (
        <div id='test-pro-layout'>
            {/* @ts-ignore */}
            <ProLayout
                title='Prompt-工坊'
                token={{
                    pageContainer: {
                        colorBgPageContainer: '#444654'
                    },
                    header: {
                        colorBgHeader: '#292f33',
                        colorHeaderTitle: '#fff',
                        colorTextMenu: '#dfdfdf',
                        colorTextMenuSecondary: '#dfdfdf',
                        colorTextMenuSelected: '#fff',
                        colorBgMenuItemSelected: '#22272b',
                        colorTextRightActionsItem: '#dfdfdf'
                    },
                    sider: {
                        colorMenuBackground: '#292f33',
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
                    <Link to='/' key='home'>
                        首页
                    </Link>,
                    <Link to='/forge' key='forge'>
                        应用工坊
                    </Link>,
                    <a onClick={openMyWorkshopPage} key='myWorkshop'>
                        我的工坊
                    </a>,
                    userInfo.username === '18268937872' ? (
                        <Link to='/admin/forge' key='adminForge'>
                            应用管理
                        </Link>
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
