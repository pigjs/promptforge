import { isImageUrl } from '@/utils/image';
import React from 'react';

import styles from './index.less';

export interface FeatureIconProps {
    color?: string;
    icon: string;
    name: string;
}

const Index = (props: FeatureIconProps) => {
    const { color, icon, name } = props;

    return (
        <div className={styles.featureIcon}>
            <div className={styles.featureIcon_icon} style={{ backgroundColor: color }}>
                {isImageUrl(icon) ? <img src={icon} /> : <span className={styles.featureIcon_icon_text}>{icon}</span>}
            </div>
            <div className={styles.featureIcon_name}>{name}</div>
        </div>
    );
};

export default React.memo(Index);
