/** 是否是图片地址 */
export function isImageUrl(url: string): boolean {
    const regex = /\.(jpeg|jpg|png|gif|bmp)$/i;
    const isLocalPath = url.startsWith('data:image') || url.startsWith('file:///');
    const isRemoteUrl = regex.test(url);
    return isLocalPath || isRemoteUrl;
}
