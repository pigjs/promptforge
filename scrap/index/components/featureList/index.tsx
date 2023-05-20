import FeatureIcon from '@/components/featureIcon';
import { useLogin } from '@/hooks/useLogin';
import React from 'react';
import { history } from 'umi';

import type { ForgeListResponse } from '@/services/types/forge';

import styles from './index.less';

export type FeatureListProps = {
    dataSource: (ForgeListResponse & {
        click?: () => void;
    })[];
};

const Index = (props: FeatureListProps) => {
    const { dataSource = [] } = props;

    const openPage = (id: string) => {
        history.push(`/feature?id=${id}`);
    };

    const openCreatePage = useLogin(
        () => {
            history.push('/forge/create');
        },
        { content: '您需要登录才能创建应用。登录后，您可以访问更多功能和服务，以及享受更好的个性化体验' }
    );

    return (
        <div className={styles.group}>
            {dataSource.map((item) => {
                return <FeatureIcon key={item.id} {...item} onClick={item.click || (() => openPage(item.id))} />;
            })}
            <FeatureIcon icon='/addForge.svg' color='#fff' name='创建应用' onClick={openCreatePage} />
        </div>
    );
};

export default React.memo(Index);
