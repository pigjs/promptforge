/** 获取当前设备是移动端还是桌面显示器 */
export function getDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
        return 'mobile';
    } else {
        const mobileQuery = window.matchMedia('(max-width: 767px)');
        return mobileQuery.matches ? 'mobile' : 'web';
    }
}

/** 是否是 移动端 */
export function isMobile() {
    return getDevice() === 'mobile';
}
