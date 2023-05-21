import { customAlphabet } from 'nanoid';

export function generateId(limit = 18) {
    /** nanoid 长度 */
    const nanoidLimit = limit;
    /** nanoid 自定义字符集 */
    const customAlphabetStr = '123456789';

    const nanoid = customAlphabet(customAlphabetStr, nanoidLimit);

    return nanoid();
}
