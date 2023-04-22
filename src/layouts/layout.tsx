import SettingModal from '@/components/settingModal';
import BugOutlined from '@ant-design/icons/BugOutlined';
import DesktopOutlined from '@ant-design/icons/DesktopOutlined';
import FolderViewOutlined from '@ant-design/icons/FolderViewOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import { getUrlParam } from '@pigjs/utils';
import React from 'react';
import { history, Outlet } from 'umi';

import styles from './index.less';

const navList = [
    {
        id: 'develop',
        title: '开发',
        icon: <BugOutlined className={styles.nav_item_icon} />,
        path: '/?role=develop'
    },
    {
        id: 'product',
        title: '产品',
        icon: <DesktopOutlined className={styles.nav_item_icon} />,
        path: '/?role=product'
    },
    {
        id: 'design',
        title: '设计',
        icon: <ToolOutlined className={styles.nav_item_icon} />,
        path: '/?role=design'
    },
    {
        id: 'other',
        title: '其他',
        icon: <FolderViewOutlined className={styles.nav_item_icon} />,
        path: '/?role=other'
    }
];

const Index = () => {
    const [open, setOpen] = React.useState(false);

    const [current, setCurrent] = React.useState(() => {
        return getUrlParam('role') || 'develop';
    });

    const openPage = (item: any) => {
        setCurrent(item.id);
        history.push(item.path);
    };

    const openSettingModal = () => {
        setOpen(true);
    };

    return (
        <div>
            <div className={styles.nav}>
                <div className={styles.nav_top}>
                    {navList.map((item) => (
                        <div
                            key={item.title}
                            className={`${styles.nav_item} ${current === item.id ? styles.nav_item_current : null}`}
                            onClick={() => openPage(item)}
                        >
                            {item.icon}
                            <span className={styles.nav_item_text}>{item.title}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.nav_bottom}>
                    <div className={styles.nav_item} onClick={openSettingModal}>
                        <SettingOutlined className={styles.nav_item_icon} />
                        <span className={styles.nav_item_text}>设置</span>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <Outlet />
            </div>
            <div className={styles.bg} />
            <SettingModal open={open} closeOpen={() => setOpen(false)} />
        </div>
    );
};

export default Index;
