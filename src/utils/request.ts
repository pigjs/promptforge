import { getToken } from '@/utils/token';
import { setConfig, setMessage } from '@pigjs/request';
import { message, Modal } from 'antd';
import axios from 'axios';

// 初始化请求库配置
setConfig({
    requestType: 'axios',
    // errorCode: {
    //     // 错误状态
    //     401: () => {
    //         // 未登录
    //     }
    // },
    headers: () => {
        // headers 配置
        // 可以设置token等
        const token = getToken();
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
