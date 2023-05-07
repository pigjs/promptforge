import type { QueryPagination } from './base';

/**
 * 状态
 *
 * @option 1 已发布
 * @option 2 已下线
 * @option 3 草稿中
 * @option 4 审核中
 */
export type StatusEnumType = 1 | 2 | 3 | 4;

export interface UserInfo {
    /** 用户名 */
    username: string;
}

export interface BaseForge {
    /** 分类id */
    category: string;
    /** icon 背景颜色  */
    color?: string;
    /** 使用次数 */
    count: string;
    /** 描述信息 */
    description?: string;
    /** icon */
    icon: string;
    id: string;
    /** 名称 */
    name: string;
    /** prompt 配置 */
    prompt: string;
    /** schema 配置 */
    schema?: string;
    /** 表单 初始值 */
    initialValues?: string;
    /** 状态 */
    status: StatusEnumType;
    /** 用户信息 */
    user: UserInfo;
}

export type ForgeListRequest = QueryPagination & Partial<Pick<BaseForge, 'category' | 'name'>>;

export type ForgeUserListRequest = QueryPagination & Partial<Pick<BaseForge, 'category' | 'name' | 'status'>>;

export type ForgeListResponse = Omit<BaseForge, 'prompt' | 'status' | 'schema' | 'initialValues'>;

export type ForgeUserListResponse = Omit<BaseForge, 'prompt' | 'schema' | 'initialValues'>;

export type ForgeAllListRequest = QueryPagination & Partial<Pick<BaseForge, 'category' | 'name' | 'status'>>;

export type ForgeAllListResponse = Omit<BaseForge, 'prompt' | 'schema' | 'initialValues'>;

export type CreateForgeRequest = Omit<BaseForge, 'id' | 'count' | 'user' | 'status'>;

export type SaveDraftForgeRequest = Omit<BaseForge, 'id' | 'count' | 'user' | 'status'> & {
    id?: string;
};

export type UpdateForgeRequest = Omit<BaseForge, 'count' | 'user' | 'status'>;

export type DetailForgeResponse = Omit<BaseForge, 'prompt'>;

export type EditDetailForgeResponse = BaseForge;

export type CategoryForge = {
    /** 名称 */
    name: string;
    id: string;
};
