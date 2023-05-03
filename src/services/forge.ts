import request from '@pigjs/request';

/** 获取应用列表 */
export function getForgeList(data = {}) {
    return request({
        url: '/api/forge/list',
        params: data
    });
}

/** 获取用户应用列表 */
export function getUserForgeList(data = {}) {
    return request({
        url: '/api/forge/user/list',
        params: data
    });
}

/** 创建应用 */
export function createForge(data = {}) {
    return request({
        url: '/api/forge/create',
        method: 'POST',
        data
    });
}

/** 保存到草稿箱 */
export function saveDraft(data = {}) {
    return request({
        url: '/api/forge/draft',
        method: 'POST',
        data
    });
}

/** 获取应用详情 */
export function getDetail(id: string) {
    return request({
        url: '/api/forge/detail',
        params: { id }
    });
}

/** 获取分类 */
export function getCategory() {
    return request({
        url: '/api/forge/category'
    });
}
