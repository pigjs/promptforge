import { LocalStorage, LocalStorageKey } from '@/utils/localStorage';
import { useEvent } from '@pigjs/utils';
import React from 'react';

export enum TourEnum {
    /** 应用功能指引 */
    'featureTour' = 'featureTour',
    /** 聊天功能指引 */
    'completionTour' = 'completionTour'
}

export function useTour(type: TourEnum) {
    const [open, setOpen] = React.useState(false);

    const closeTour = useEvent(() => {
        setOpen(false);
        LocalStorage.set(LocalStorageKey[type], 'true');
    });

    const openTour = useEvent(() => {
        const tour = LocalStorage.get(LocalStorageKey[type]);
        if (tour !== 'true') {
            setOpen(true);
        }
    });

    return {
        open,
        closeTour,
        openTour
    };
}
