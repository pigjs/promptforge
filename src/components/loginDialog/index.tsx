import { dialog } from '@/components/dialog';
import { login, register } from '@/services/user';
import { eventHub } from '@/utils/eventHub';
import { setToken, setUserInfo } from '@/utils/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';

import type { DialogFC } from '@/components/dialog';

import styles from './index.less';

const activeEnum = {
    login: {
        title: '用户登录',
        okText: '登录',
        footerText: '没有账号？点击注册',
        setActiveText: 'registry',
        successText: '登录成功'
    },
    registry: {
        title: '用户注册',
        okText: '注册',
        footerText: '已有账号？立即登陆',
        setActiveText: 'login',
        successText: '注册成功'
    }
};

type ActiveType = keyof typeof activeEnum;

export type LoginProps = {
    /** 登录成功回调 不传默认 刷新页面 */
    onOk?: () => Promise<void> | void;
};

const Index: DialogFC<LoginProps> = (props) => {
    const { onClose } = props;

    const [loading, setLoading] = React.useState(false);
    const [active, setActive] = React.useState<ActiveType>('login');

    const onOk = async () => {
        await props.onOk?.();
        eventHub.emit('login');
        onClose();
    };

    const onFinish = async (values: any) => {
        const { password, username } = values;
        setLoading(true);
        try {
            let res;
            if (active === 'login') {
                res = await login({ username, password });
            }
            if (active === 'registry') {
                res = await register({ username, password });
            }
            const data = res?.data || {};
            const { token, userInfo } = data;
            setToken(token);
            setUserInfo(userInfo);
            setLoading(false);

            message.success(activeEnum[active].successText);
            onOk();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    return (
        <Modal open onCancel={onClose} footer={null} width={400} bodyStyle={{ padding: ' 30px 15px 10px 15px' }}>
            <div className={styles.login}>
                <div className={styles.login_title}>{activeEnum[active].title}</div>
                <Form onFinish={onFinish}>
                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名'
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} type='password' placeholder='请输入密码' />
                    </Form.Item>
                    {active === 'registry' ? (
                        <>
                            <Form.Item
                                name='rePassword'
                                rules={[
                                    {
                                        required: true,
                                        message: '请再次输入密码！'
                                    }
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='请输入密码' />
                            </Form.Item>
                            {/* <Form.Item
                                name='agreement'
                                valuePropName='checked'
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('请勾选同意协议'))
                                    }
                                ]}
                            >
                                <Checkbox style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
                                        我已阅读并同意<span>服务条款</span>、<span>隐私政策</span>
                                    </span>
                                </Checkbox>
                            </Form.Item> */}
                        </>
                    ) : null}
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block loading={loading}>
                            {activeEnum[active].okText}
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.login_footer}>
                    <a className={styles.login_footer_text} onClick={() => setActive(activeEnum[active].setActiveText)}>
                        {activeEnum[active].footerText}
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default dialog(Index);
