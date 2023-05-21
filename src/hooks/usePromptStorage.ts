import { getStore } from '@/utils/localforage';
import { getUserInfo } from '@/utils/user';
import { isFunction, isNull, useEvent, useMount } from '@pigjs/utils';
import React from 'react';

import type { MessageType } from '@/components/messageList';

const getKey = (key: string, userId: string) => {
    return `${key}_${userId}`;
};

export function usePromptStorage(key: string, isStore = true) {
    const [state, setState] = React.useState<MessageType[]>([]);
    const getData = async () => {
        const userInfo = getUserInfo();
        if (userInfo.userId && isStore) {
            const storageKey = getKey(key, userInfo.userId);
            const store = getStore(userInfo.userId);
            const data = await store.getItem<MessageType[]>(storageKey);
            setState(isNull(data) ? [] : data);
        }
    };

    useMount(() => {
        getData();
    });

    const _setState = useEvent((data: any | ((prev: any) => any)) => {
        const value = isFunction(data) ? data(state) : data;
        setState(value);
        const userInfo = getUserInfo();
        if (userInfo.userId && isStore) {
            const storageKey = getKey(key, userInfo.userId);
            const store = getStore(userInfo.userId);
            store.setItem<MessageType[]>(storageKey, value);
        }
    });

    /** 登录后合并当前状态和本地状态 */
    const loginSetState = useEvent(async () => {
        const userInfo = getUserInfo();
        if (userInfo.userId && isStore) {
            const storageKey = getKey(key, userInfo.userId);
            const store = getStore(userInfo.userId);
            const data = (await store.getItem<MessageType[]>(storageKey)) || [];

            const newState = [...data, ...state];
            store.setItem<MessageType[]>(storageKey, newState);
            setState(newState);
        }
    });

    return [state, _setState, loginSetState] as [
        state: MessageType[],
        _setState: (data: MessageType[]) => void,
        loginSetState: () => Promise<void>
    ];
}
