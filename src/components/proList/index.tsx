import { ProList } from '@ant-design/pro-components';
import React from 'react';
import { useModel } from 'umi';

import styles from './index.less';

import type { ProListProps } from '@ant-design/pro-components';

const Index = (props: ProListProps) => {
    const { mobile } = useModel('uaModel');

    return (
        <div className={`${styles.list} ${mobile ? styles.mobile : ''}`}>
            <ProList pagination={{}} search={{}} grid={{ gutter: 16, column: mobile ? 1 : 3 }} {...props} />
        </div>
    );
};

export default Index;
