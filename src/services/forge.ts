import request from '@pigjs/request';

/** 获取工具列表 */
export function getForgeList(data = {}) {
    return request({
        url: '/api/forge/list',
        params: data
    });
}

/** 创建工具 */
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

/** 获取工具详情 */
export function getDetail(id: string) {
    return request({
        url: '/api/forge/detail',
        params: { id }
    });
}
