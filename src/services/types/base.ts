export interface QueryPagination {
    pageNo?: number;
    pageSize?: number;
}

export type BaseResponse<T = void> = Promise<{
    data: T;
    [key: string]: any;
}>;
