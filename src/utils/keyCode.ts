/** 判断当前是否是回车触发，不包括中文输入或换行触发 */
export function isEnterKey(event: any) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        // 判断是否处于中文输入状态
        if (event.target.composing) {
            return false;
        }
        return true;
    }
    return false;
}
