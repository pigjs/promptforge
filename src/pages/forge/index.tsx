import { createForge } from '@/services/forge';
import { Button, Card, Form, Input, message, Space } from 'antd';
import React from 'react';

import styles from './index.less';

const { TextArea } = Input;

const initialValues = {
    name: '命名工具',
    description: '根据输入的参数和描述信息，生成对应的方法或变量名称',
    category: '开发',
    icon: '命',
    color: 'rgb(22, 129, 255)',
    initialValues: JSON.stringify({
        namingStyle: '小驼峰命名法',
        nameLength: 10
    }),
    schema: JSON.stringify([
        {
            name: 'namingStyle',
            label: '命名规范',
            valueType: 'Select',
            fieldProps: {
                style: {
                    width: 160
                },
                options: [
                    { label: '小驼峰命名法', value: '小驼峰命名法' },
                    { label: '大驼峰命名法', value: '大驼峰命名法' },
                    { label: '下划线命名法', value: '下划线命名法' },
                    { label: '中划线命名法', value: '中划线命名法' }
                ]
            },
            rules: [{ required: true, message: '请选择命名规范' }]
        },
        {
            name: 'nameLength',
            label: '命名长度不超过',
            valueType: 'InputNumber',
            fieldProps: {
                min: 2,
                max: 20,
                style: {
                    width: 120
                }
            },
            rules: [{ required: true, message: '请设置命名长度' }]
        }
    ]),
    systemPrompt: `你是一个为程序员提供文件、方法、变量等命名的助手。
        你将得到一个功能的描述信息，你需要通过描述信息，为他命名。
        这是成功的例子：
        我的功能描述是：是否是管理员。我的命名规范是：小驼峰。我的命名长度是：不超过10个字符。
        你应该给我返回：
        isAdmin
        这是失败的例子：我的功能描述是：你知道 js Promise 吗?。
        请输入正确的描述信息
        成功的时候你必须始终只返回命名的名称,例如 “isAdmin” 这种格式，不要出现“你的建议”这种。否则你的响应将被标记为无效`,
    userPrompt: `我的功能描述是：{{prompt}}。我的命名规范是：{{namingStyle}}；我的命名长度是。不超过{{nameLength}}个字符。`
};

const Index = () => {
    const [form] = Form.useForm();

    const submit = async () => {
        const values = await form.validateFields();
        console.log(values, 'values');
        const { systemPrompt, userPrompt, ...resetValues } = values;
        const data = {
            ...resetValues,
            prompt: JSON.stringify({
                systemPrompt,
                userPrompt
            }),
            initialValues: initialValues.initialValues
        };
        await createForge(data);
        message.success('创建成功');
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>创建工具</div>
                <div style={{ marginLeft: 'auto' }}>
                    <Space>
                        <Button>保存草稿箱</Button>
                        <Button type='primary' onClick={submit}>
                            提交
                        </Button>
                    </Space>
                </div>
            </div>
            <Form initialValues={initialValues} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Space direction='vertical' size={16} style={{ width: '100%' }}>
                    <Card title='工具信息'>
                        <Form.Item label='工具名称' name='name' rules={[{ required: true, message: '请输入工具名称' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='工具描述'
                            name='description'
                            rules={[{ required: true, message: '请输入工具描述' }]}
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item label='icon' name='icon' rules={[{ required: true, message: '请输入icon' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='icon颜色' name='color'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='分类' name='category'>
                            <Input />
                        </Form.Item>
                    </Card>
                    <Card title='prompt 配置'>
                        <Form.Item
                            label='systemPrompt'
                            name='systemPrompt'
                            rules={[{ required: true, message: '请输入 systemPrompt' }]}
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            label='userPrompt'
                            name='userPrompt'
                            rules={[{ required: true, message: '请输入 userPrompt' }]}
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item label='输入配置' name='schema'>
                            <TextArea />
                        </Form.Item>
                    </Card>
                </Space>
            </Form>
        </div>
    );
};

export default Index;
