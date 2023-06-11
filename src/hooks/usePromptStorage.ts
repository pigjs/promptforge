import { getStore } from '@/utils/localforage';
import { isFunction, isNil, useEvent, useMount } from '@pigjs/utils';
import React from 'react';

const getKey = (key: string) => {
    return `${key}`;
};

const getStoreName = () => {
    return 'system';
};

export function usePromptStorage<T>(key: string, isStore = true) {
    const [state, setState] = React.useState<T[]>([]);

    const getData = async () => {
        if (isStore) {
            const storageKey = getKey(key);
            const store = getStore(getStoreName());
            const data = await store.getItem<T[]>(storageKey);
            setState(isNil(data) ? [] : data);
        }
    };

    useMount(() => {
        getData();
    });

    const _setState = useEvent((data: any | ((prev: any) => any)) => {
        const value = isFunction(data) ? data(state) : data;
        setState(value);
        if (isStore) {
            const storageKey = getKey(key);
            const store = getStore(getStoreName());
            store.setItem<T[]>(storageKey, value);
        }
    });

    return [state, _setState] as [state: T[], _setState: (data: T[]) => void];
}
