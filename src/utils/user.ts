import { isObject } from '@pigjs/utils';

export interface UserInfo {
    userId: string;
    /** 用户名 */
    username: string;
}

/** 获取用户信息 */
export function getUserInfo(): UserInfo {
    let userInfo: any = localStorage.getItem('userInfo');
    if (!userInfo) {
        return {};
    }
    try {
        userInfo = JSON.parse(userInfo);
    } catch (err) {
        console.error('userInfo 解析失败：', err);
        userInfo = {};
    }
    return userInfo;
}

/** 保存用户信息 */
export function setUserInfo(userInfo: UserInfo) {
    if (isObject(userInfo)) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
}
/** 删除用户信息 */
export function clearUserInfo() {
    localStorage.removeItem('userInfo');
}
