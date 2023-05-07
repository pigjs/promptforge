import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { useUnmount, useUpdate } from '@pigjs/utils';
import { useInterval } from 'ahooks';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import styles from './index.less';

const Index = () => {
    const [isCode, setIsCode] = React.useState(false); // 是否正在发送验证码
    const [time, setTime] = React.useState(0); // 当前倒计时时间
    useInterval(
        () => {
            if (time > 0) {
                setTime(time - 1);
            } else {
                setIsCode(false);
            }
        },
        isCode ? 1000 : undefined
    );
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values, '提交表单且数据验证成功后回调事件');
    };
    /** 点击发送验证码 开启倒计时60s */
    const sendCode = () => {
        setIsCode(true);
        setTime(5);
    };

    return (
        <Form name='normal_login' className={styles.usernameLogin} onFinish={onFinish}>
            <Form.Item
                name='username'
                rules={[
                    {
                        required: true,
                        message: '请输入邮箱！'
                    }
                ]}
                className={styles.usernameLogin_item}
            >
                <Input
                    prefix={<UserOutlined className={styles.usernameLogin_item_usenameIcon} />}
                    placeholder='请输入邮箱'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: '请输入验证码'
                    }
                ]}
                className={styles.usernameLogin_item}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        prefix={<LockOutlined className={styles.usernameLogin_item_passwordIcon} />}
                        type='password'
                        placeholder='请输入验证码'
                    />
                    <Button disabled={isCode} type='primary' onClick={sendCode}>
                        {!isCode ? '发送验证码' : `${time}`}
                    </Button>
                </Space.Compact>
            </Form.Item>
            <Form.Item className={styles.usernameLogin_item}>
                <Button type='primary' htmlType='submit' className={styles.usernameLogin_item_button_login}>
                    登陆
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Index;
