/** 获取token */
export function getToken() {
    return localStorage.getItem('Authorization');
}

/** 设置token */
export function setToken(token: string) {
    localStorage.setItem('Authorization', token);
}

/** 删除token */
export function clearToken() {
    localStorage.removeItem('Authorization');
}
