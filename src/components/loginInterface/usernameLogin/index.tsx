import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import styles from './index.less';
const Index = () => {
    // const handleCancel = () => {
    //     setIsOpenRegisterModal(false);
    // };
    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values, '提交表单且数据验证成功后回调事件');
    };
    return (
        <Form name='normal_login' className={styles.usernameLogin} onFinish={onFinish}>
            <Form.Item
                name='username'
                rules={[
                    {
                        required: true,
                        message: '请输入用户名！'
                    }
                ]}
                className={styles.usernameLogin_item}
            >
                <Input
                    prefix={<UserOutlined className={styles.usernameLogin_item_usenameIcon} />}
                    placeholder='请输入用户名'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: '请输入密码！'
                    }
                ]}
                className={styles.usernameLogin_item}
            >
                <Input
                    prefix={<LockOutlined className={styles.usernameLogin_item_passwordIcon} />}
                    type='password'
                    placeholder='请输入密码'
                />
            </Form.Item>
            <Form.Item className={styles.usernameLogin_item}>
                <Button type='primary' htmlType='submit' className={styles.usernameLogin_item_button}>
                    登陆
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Index;
