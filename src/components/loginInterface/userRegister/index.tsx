import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styles from './index.less';

const Index = () => {
    return (
        <div className={styles.userRegister}>
            <div className={styles.userRegister_title}>账号注册</div>
            <Form>
                <Form.Item
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: '请设置用户名！'
                        }
                    ]}
                    className={styles.userRegister_item}
                >
                    <Input
                        prefix={<UserOutlined className={styles.userRegister_item_usenameIcon} />}
                        placeholder='请设置用户名'
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: '请输入密码'
                        }
                    ]}
                    className={styles.userRegister_item}
                >
                    <Input.Password
                        prefix={<LockOutlined className={styles.userRegister_item_passwordIcon} />}
                        type='password'
                        placeholder='请输入密码'
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！'
                        }
                    ]}
                    className={styles.usernameLogin_item}
                >
                    <Input.Password
                        prefix={<LockOutlined className={styles.userRegister_item_passwordIcon} />}
                        placeholder='请输入密码'
                    />
                </Form.Item>
                <Form.Item
                    name='agreement'
                    valuePropName='checked'
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('请勾选同意协议'))
                        }
                    ]}
                    className={styles.userRegister_checkboxItem}
                >
                    <Checkbox style={{ fontSize: 10 }}>
                        我已阅读并同意<a>服务条款</a>、<a>隐私政策</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item className={styles.userRegister_item}>
                    <Button type='primary' htmlType='submit' className={styles.userRegister_item_button}>
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Index;
