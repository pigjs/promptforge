import loginDialog from '@/components/loginDialog';
import { eventHub } from '@/utils/eventHub';
import { LocalStorage, LocalStorageKey } from '@/utils/localStorage';
import { setConfig, setMessage } from '@pigjs/request';
import { message, Modal } from 'antd';
import axios from 'axios';

// 登录单例
let loginInstance = false;

// 初始化请求库配置
setConfig({
    requestType: 'axios',
    successCode: [200, 201, 204],
    errorCode: {
        // 错误状态
        401: () => {
            // 未登录
            if (!loginInstance) {
                // 触发退出登录事件，useModel 内部会处理退出登录的
                eventHub.emit('logout');
                const reload = () => {
                    setTimeout(() => location.reload(), 300);
                };
                const loginSuccess = (options) => {
                    const { userInfo, token } = options;
                    LocalStorage.set(LocalStorageKey.userInfo, userInfo);
                    LocalStorage.set(LocalStorageKey.token, token);
                };
                loginDialog().show({ onOk: reload, loginSuccess });
                loginInstance = true;
            }
        }
    },
    headers: () => {
        // headers 配置
        const token = LocalStorage.get(LocalStorageKey.token);
        if (token) {
            return {
                Authorization: `Bearer ${token}`
            };
        }
        return {};
    },
    resKeys: {
        // 后端返回到格式
        code: 'status',
        data: 'data',
        message: 'message'
    },
    requestInstance: axios
});

const errorList: string[] = [];

const handleError = () => {
    if (errorList.length > 0) {
        const content = errorList.shift();
        Modal.error({
            title: '温馨提示',
            content,
            onOk: () => {
                handleError();
            }
        });
    }
};

setMessage({
    loading: (content) => {
        message.loading(content);
    },
    destroy: () => {
        message.destroy();
    },
    error: (content) => {
        errorList.push(content);
        if (errorList.length === 1) {
            handleError();
        }
    }
});
