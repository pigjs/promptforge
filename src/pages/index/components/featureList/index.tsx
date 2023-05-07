import FeatureIcon from '@/components/featureIcon';
import React from 'react';
import { history } from 'umi';

import type { ForgeListResponse } from '@/services/types/forge';

import styles from './index.less';

const Index = (props: { dataSource: ForgeListResponse[] }) => {
    const { dataSource = [] } = props;

    const openPage = (id: string) => {
        history.push(`/feature?id=${id}`);
    };

    return (
        <div className={styles.group}>
            {dataSource.map((item) => {
                return <FeatureIcon key={item.id} {...item} onClick={() => openPage(item.id)} />;
            })}
        </div>
    );
};

export default React.memo(Index);
