import request from '@pigjs/request';

import type { BaseResponse } from '@/services/types/base';
import type {
    CategoryForge,
    CreateForgeRequest,
    DetailForgeResponse,
    EditDetailForgeResponse,
    ForgeAllListRequest,
    ForgeAllListResponse,
    ForgeListRequest,
    ForgeListResponse,
    ForgeUserListRequest,
    ForgeUserListResponse,
    SaveDraftForgeRequest,
    UpdateForgeRequest
} from '@/services/types/forge';

/** 获取应用列表 */
export function getForgeList(params: ForgeListRequest = {}) {
    return request({
        url: '/api/forge/list',
        params
    }) as BaseResponse<ForgeListResponse[]>;
}

/** 获取用户应用列表 */
export function getUserForgeList(params: ForgeUserListRequest = {}) {
    return request({
        url: '/api/forge/user',
        params
    }) as BaseResponse<ForgeUserListResponse[]>;
}

/** 创建应用 */
export function createForge(data: CreateForgeRequest) {
    return request({
        url: '/api/forge/create',
        method: 'POST',
        data
    });
}

/** 保存到草稿箱 */
export function saveDraft(data: SaveDraftForgeRequest) {
    return request({
        url: '/api/forge/draft',
        method: 'POST',
        data
    }) as BaseResponse<{ id: string }>;
}

/** 更新应用 */
export function updateForge(data: UpdateForgeRequest) {
    return request({
        url: '/api/forge/update',
        method: 'POST',
        data
    });
}

/** 获取应用详情 */
export function getDetail(id: string) {
    return request({
        url: '/api/forge/detail',
        params: { id }
    }) as BaseResponse<DetailForgeResponse>;
}

/** 获取编辑应用详情 */
export function getEditDetail(id: string) {
    return request({
        url: '/api/forge/editDetail',
        params: { id }
    }) as BaseResponse<EditDetailForgeResponse>;
}

/** 获取分类 */
export function getCategory() {
    return request({
        url: '/api/forge/category'
    }) as BaseResponse<CategoryForge[]>;
}

/** 获取所有应用列表 */
export function getAllList(params: ForgeAllListRequest) {
    return request({
        url: '/api/forge/all',
        params
    }) as BaseResponse<ForgeAllListResponse[]>;
}

/** 应用审批通过 */
export function approvePass(id: string) {
    return request({
        url: '/api/forge/approvePass',
        method: 'PUT',
        data: { id }
    });
}

/** opanai 生成图片 */
export function imagesGenerations(data = {}) {
    return request({
        url: '/api/forge/images/generations',
        method: 'POST',
        data
    });
}
