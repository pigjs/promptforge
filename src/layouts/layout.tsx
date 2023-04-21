import HomeOutlined from '@ant-design/icons/HomeOutlined';
import { getUrlParam } from '@pigjs/utils';
import React from 'react';
import { history, Outlet } from 'umi';

import styles from './index.less';

const navList = [
    {
        id: 'develop',
        title: '开发',
        icon: <HomeOutlined className={styles.nav_item_icon} />,
        path: '/?role=develop'
    },
    {
        id: 'product',
        title: '产品',
        icon: <HomeOutlined className={styles.nav_item_icon} />,
        path: '/?role=product'
    },
    {
        id: 'design',
        title: '设计',
        icon: <HomeOutlined className={styles.nav_item_icon} />,
        path: '/?role=design'
    }
];

const Index = () => {
    const [current, setCurrent] = React.useState(() => {
        return getUrlParam('role') || 'develop';
    });

    const openPage = (item: any) => {
        setCurrent(item.id);
        history.push(item.path);
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
                    <div className={styles.nav_item}>
                        <HomeOutlined className={styles.nav_item_icon} />
                        <span className={styles.nav_item_text}>设置</span>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <Outlet />
            </div>
            <div className={styles.bg} />
        </div>
    );
};

export default Index;
