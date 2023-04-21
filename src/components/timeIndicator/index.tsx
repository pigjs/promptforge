import { useMount, useUnmount } from '@pigjs/utils';
import React from 'react';

import { getCurrentDateTime } from '@/utils/getCurrentDateTime';
import styles from './index.less';

type ValueType = {
    dateString?: string;
    timeString?: string;
    secondsString?: string;
};

const Index = () => {
    const [value, setValue] = React.useState<ValueType>(() => {
        return getCurrentDateTime();
    });

    const timerRef = React.useRef<any>(null);

    useMount(() => {
        timerRef.current = setInterval(() => {
            const data = getCurrentDateTime();
            setValue(data);
        }, 1000);
    });

    useUnmount(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    });

    return (
        <div className={styles.timeIndicator}>
            <div className={styles.timeIndicator_time}>
                <span>{value.timeString}</span>
                <span className={styles.timeIndicator_seconds}>
                    {value.secondsString ? `:${value.secondsString}` : ''}
                </span>
            </div>
            <div className={styles.timeIndicator_date}>{value.dateString}</div>
        </div>
    );
};

export default React.memo(Index);
