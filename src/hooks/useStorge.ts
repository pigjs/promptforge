import localforage from '@/utils/localforage';
import { isFunction, isNull, useEvent, useMount } from '@pigjs/utils';
import React from 'react';

export function useStorage<T>(key: string) {
    const [state, setState] = React.useState<T>();
    const getData = async () => {
        const data = await localforage.getItem<T>(key);
        setState(isNull(data) ? undefined : data);
    };

    useMount(() => {
        getData();
    });

    const _setState = useEvent((data: any | ((prev: any) => any)) => {
        const value = isFunction(data) ? data(state) : data;
        setState(value);
        localforage.setItem<T | undefined>(key, value);
    });

    return [state, _setState] as [state: T, _setState: (data: T) => void];
}
