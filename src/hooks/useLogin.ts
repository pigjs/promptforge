import { useDialog } from '@/components/dialog';
import loginDialog from '@/components/loginDialog';
import { useEvent } from '@pigjs/utils';
import { Modal } from 'antd';
import { useModel } from 'umi';

export function useLogin(callback: (...args: any) => void, options: { content: string }) {
    const { content } = options;
    const [loginShow] = useDialog(loginDialog);
    const { isLogin, loginSuccess } = useModel('userModel');

    const _callback = useEvent((...args: any) => {
        if (!isLogin) {
            Modal.confirm({
                title: '温馨提示',
                content,
                okText: '前往登录',
                cancelText: '取消',
                onOk: () => {
                    loginShow({ onOk: () => callback(...args), loginSuccess });
                }
            });
        } else {
            callback(...args);
        }
    });
    return _callback;
}
