import request from '@pigjs/request';

/** 用户注册 */
export function register(data) {
    return request({
        url: '/api/user/registry',
        method: 'POST',
        data
    });
}

/** 用户登录 */
export function login(data) {
    return request({
        url: '/api/user/login',
        method: 'POST',
        data
    });
}
