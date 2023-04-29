import type { ProSettings } from '@ant-design/pro-components';
import { ProLayout, SettingDrawer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { history, Link, Outlet, useLocation } from 'umi';

// import styles from './index.less';

export default () => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: false
    });

    const location = useLocation();
    const { pathname } = location;

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
    console.log(location, 'location');
    console.log(settings, 'settings');

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
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    size: 'small',
                    title: (
                        <div
                            style={{
                                color: '#dfdfdf'
                            }}
                        >
                            七妮妮
                        </div>
                    )
                }}
                actionsRender={() => [<Link to='/forge'>工坊</Link>]}
                onMenuHeaderClick={(e) => console.log(e)}
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
            <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams={false}
            />
        </div>
    );
};
