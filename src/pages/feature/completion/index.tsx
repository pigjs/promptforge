import { LocalStorage, LocalStorageKey } from '@/utils/localStorage';
import React from 'react';
import Content from './components/content';
import Sidebar from './components/sidebar';

import styles from './index.less';

const Index = () => {
    const [activeKey, setActiveKey] = React.useState<string | undefined>(() => {
        return LocalStorage.get(LocalStorageKey.activeCompletions) as string;
    });

    const sidebarRef = React.useRef(null);

    const onChange = (id?: string) => {
        setActiveKey(id);
    };

    const setName = (value: string) => {
        const val = value?.trim();
        if (activeKey && val) {
            const resetVal = val.slice(0, 20);
            sidebarRef.current?.setName(activeKey, resetVal, false);
        }
    };

    const addCompletion = () => {
        sidebarRef.current?.addCompletion();
    };

    return (
        <div className={styles.page}>
            <Sidebar ref={sidebarRef} onChange={onChange} activeKey={activeKey} />
            {activeKey ? (
                <Content key={activeKey} id={activeKey} setName={setName} />
            ) : (
                <div className={styles.empty}>
                    当前暂无聊天消息，
                    <a onClick={addCompletion} className={styles.empty_add}>
                        去创建
                    </a>
                </div>
            )}
        </div>
    );
};

export default Index;
