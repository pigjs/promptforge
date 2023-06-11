import { eventHub } from '@/utils/eventHub';
import { LocalStorage, LocalStorageKey } from '@/utils/localStorage';
import { useEvent, useMount, useUnmount } from '@pigjs/utils';
import React from 'react';

export interface UserInfo {
    userId: string;
    /** 用户名 */
    username: string;
}

export default function () {
    const [userInfo, setUserInfo] = React.useState<UserInfo | {}>(() => {
        return LocalStorage.get(LocalStorageKey.userInfo) || {};
    });

    const [token, setToken] = React.useState(() => {
        return LocalStorage.get(LocalStorageKey.token);
    });

    const logout = useEvent(() => {
        setUserInfo({});
        setToken('');
        LocalStorage.del(LocalStorageKey.userInfo);
        LocalStorage.del(LocalStorageKey.token);
    });

    // 因为接口请求的时候 可能直接会 401 拦截，直接退出登录，所以需要监听一下 退出登录事件
    useMount(() => {
        eventHub.on('logout', logout);
    });

    useUnmount(() => {
        eventHub.off('logout', logout);
    });

    const isLogin = !!token;

    const loginSuccess = useEvent((options: { userInfo: UserInfo; token: string }) => {
        const { userInfo, token } = options;
        setUserInfo(userInfo);
        setToken(token);
        LocalStorage.set(LocalStorageKey.userInfo, userInfo);
        LocalStorage.set(LocalStorageKey.token, token);
    });

    return {
        userInfo,
        token,
        isLogin,
        loginSuccess,
        logout
    };
}
