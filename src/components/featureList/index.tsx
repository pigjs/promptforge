import { isImageUrl } from '@/utils/image';
import React from 'react';
import { history } from 'umi';

import type { FeatureCategory } from '@/utils/getFeature';

import styles from './index.less';

const Index = (props: { dataSource: FeatureCategory[] }) => {
    const { dataSource = [] } = props;

    const openPage = (id: string) => {
        history.push(`/feature?id=${id}`);
    };

    return (
        <div className={styles.group}>
            {dataSource.map((item) => {
                return (
                    <div key={item.id} className={styles.group_item} onClick={() => openPage(item.id)}>
                        <div className={styles.group_item_icon} style={{ backgroundColor: item.color }}>
                            {isImageUrl(item.icon) ? (
                                <img src={item.icon} />
                            ) : (
                                <span className={styles.group_item_icon_text}>{item.icon}</span>
                            )}
                        </div>
                        <div className={styles.group_item_name}>{item.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(Index);
