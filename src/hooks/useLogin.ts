import { useDialog } from '@/components/dialog';
import loginDialog from '@/components/loginDialog';
import { getUserInfo } from '@/utils/user';
import { useEvent } from '@pigjs/utils';
import { Modal } from 'antd';

export function useLogin(callback: (...args: any) => void, options: { content: string }) {
    const { content } = options;
    const [loginShow] = useDialog(loginDialog);

    const _callback = useEvent((...args: any) => {
        const userInfo = getUserInfo();
        if (!userInfo.userId) {
            Modal.confirm({
                title: '温馨提示',
                content,
                okText: '前往登录',
                cancelText: '取消',
                onOk: () => {
                    loginShow({ onOk: () => callback(...args) });
                }
            });
        } else {
            callback(...args);
        }
    });
    return _callback;
}
