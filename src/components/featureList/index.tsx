import { isImageUrl } from '@/utils/image';
import React from 'react';
import { history } from 'umi';

import type { FeatureCategory } from '@/utils/getFeature';

import { isEmptyObject } from '@pigjs/utils';
import styles from './index.less';

const Index = (props: { dataSource: FeatureCategory[] }) => {
    const { dataSource = [] } = props;

    const openPage = (id: string) => {
        history.push(`/feature?feature=${id}`);
    };

    const dataSourceMemo = React.useMemo(() => {
        const data = dataSource.filter((item) => {
            return item.featureCategory && !isEmptyObject(item.cardInfo) && item.cardInfo;
        });
        return data;
    }, [dataSource]);

    return (
        <div className={styles.group}>
            {dataSourceMemo.map((item) => {
                const { cardInfo } = item;
                return (
                    <div key={cardInfo.name} className={styles.group_item} onClick={() => openPage(item.id)}>
                        <div className={styles.group_item_icon} style={{ backgroundColor: cardInfo.color }}>
                            {isImageUrl(cardInfo.icon) ? (
                                <img src={cardInfo.icon} />
                            ) : (
                                <span className={styles.group_item_icon_text}>{cardInfo.icon}</span>
                            )}
                        </div>
                        <div className={styles.group_item_name}>{cardInfo.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(Index);
