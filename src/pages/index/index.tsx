import React from 'react';

import logo from '@/assets/logo.svg';
import styles from './index.less';

const Index = () => {
    return (
        <div>
            <div className={styles.app}>
                <header className={styles.app_header}>
                    <img src={logo} className={styles.app_logo} alt='logo' />
                    <p className={styles.app_content}>
                        Edit <code>src/pages/index/index.tsx</code> and save to reload.
                    </p>
                    <a className={styles.app_link} href='https://react.docschina.org/learn'>
                        Learn React
                    </a>
                </header>
            </div>
        </div>
    );
};

export default Index;
