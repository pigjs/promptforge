import request from '@pigjs/request';

/** 添加密钥 */
export function addSecretkey(data = {}) {
    return request({
        url: '/api/openai/secretkey',
        method: 'POST',
        data
    });
}

/** 获取密钥列表 */
export function getSecretkey(params = {}) {
    return request({
        url: '/api/openai/secretkey/list',
        params
    });
}

/** 更新密钥 */
export function updateSecretkey(data = {}) {
    return request({
        url: '/api/openai/secretkey',
        method: 'PUT',
        data
    });
}

/** openai apiKey 余额 */
export function getBilling(apiKey: string) {
    return request({
        url: 'https://promptforge.uk/v1/dashboard/billing',
        params: {
            apiKey
        }
    });
}

/** 获取解密密钥 */
export function getApiKey() {
    return request({
        url: '/api/openai/secretkey'
    });
}
