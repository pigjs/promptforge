import Color from '@/components/color';
import { useDialog } from '@/components/dialog';
import FeatureIcon from '@/components/featureIcon';
import Field from '@/components/field';
import formConfigDialog from '@/components/formConfigDialog';
import { createForge } from '@/services/forge';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { omit, useSetState } from '@pigjs/utils';
import { Button, Card, Form, Input, message, Modal, Select, Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';

import type { FieldProps } from '@/components/field';

import styles from './index.less';

const { TextArea } = Input;

const defaultInitialValues = {
    name: '命名工具',
    description: '根据输入的参数和描述信息，生成对应的方法或变量名称',
    icon: '命',
    color: 'rgb(22, 129, 255)',
    schema: [
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
    ],
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
    const [formConfigShow] = useDialog(formConfigDialog);
    const [state, setState] = useSetState<any>({
        initialValues: {
            namingStyle: '小驼峰命名法',
            nameLength: 10
        },
        schema: defaultInitialValues.schema
    });

    const { initialState } = useModel('@@initialState');

    const { categoryOptions } = initialState;

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
            schema: JSON.stringify(state.schema),
            initialValues: JSON.stringify(state.initialValues)
        };
        await createForge(data);
        message.success('创建成功');
    };

    const name = Form.useWatch('name', { form });
    const icon = Form.useWatch('icon', { form });
    const color = Form.useWatch('color', { form });

    const handleFormConfig = (row?: FieldProps) => {
        const onOk = (item: FieldProps, initialValue?: string) => {
            console.log(item, initialValue, 'ok');
            const { schema, initialValues } = state;
            const isNameDupList = schema.filter((it: any) => it.name === item.name);
            const len = row ? 2 : 1;
            if (isNameDupList.length >= len) {
                Modal.error({
                    title: '温馨提示',
                    content: '字段名称已存在，请修改后提示！'
                });
                return Promise.reject();
            }
            let resetSchema = [...schema];
            if (row) {
                resetSchema = schema.map((it: any) => {
                    if (it.name === item.name) {
                        return item;
                    }
                    return it;
                });
            } else {
                resetSchema.push(item);
            }
            setState({
                schema: resetSchema,
                initialValues: {
                    ...initialValues,
                    [item.name]: initialValue
                }
            });
        };
        let options = {
            onOk
        };
        if (row) {
            options = {
                ...options,
                // @ts-ignore
                dataSource: row,
                // @ts-ignore
                initialValue: state.initialValues[row.name]
            };
        }
        formConfigShow(options);
    };
    const clearFormConfig = (row: FieldProps) => {
        Modal.confirm({
            title: '温馨提示',
            content: '确定删除该组件吗？',
            onOk: () => {
                const { name } = row;
                const schema = state.schema.filter((item: any) => item.name !== name);
                setState({
                    schema,
                    initialValues: omit(state.initialValues, [row.name])
                });
            }
        });
    };

    const featureIconProps = {
        name,
        icon,
        color
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>创建应用</div>
                <div style={{ marginLeft: 'auto' }}>
                    <Space>
                        <Button>保存草稿箱</Button>
                        <Button type='primary' onClick={submit}>
                            提交
                        </Button>
                    </Space>
                </div>
            </div>
            <Form initialValues={defaultInitialValues} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Space direction='vertical' size={16} style={{ width: '100%' }}>
                    <Card title='应用信息'>
                        <Form.Item label='应用名称' name='name' rules={[{ required: true, message: '请输入应用名称' }]}>
                            <Input placeholder='请输入应用名称' />
                        </Form.Item>
                        <Form.Item
                            label='应用描述'
                            name='description'
                            rules={[{ required: true, message: '请输入应用描述' }]}
                        >
                            <TextArea placeholder='请输入应用描述' />
                        </Form.Item>
                        <Form.Item
                            label='icon'
                            name='icon'
                            rules={[{ required: true, message: '请输入图片地址/文字' }]}
                        >
                            <Input placeholder='请输入图片地址/文字' />
                        </Form.Item>
                        <Form.Item label='icon颜色' name='color'>
                            <Color />
                        </Form.Item>
                        <Form.Item label='图标'>
                            {featureIconProps.icon ? <FeatureIcon {...featureIconProps} /> : null}
                        </Form.Item>
                        <Form.Item label='分类' name='category'>
                            <Select
                                options={categoryOptions}
                                placeholder='请选择分类'
                                fieldNames={{ label: 'name', value: 'id' }}
                            />
                        </Form.Item>
                    </Card>
                    <Card title='prompt 配置'>
                        <Form.Item
                            label='systemPrompt'
                            name='systemPrompt'
                            rules={[{ required: true, message: '请输入 systemPrompt' }]}
                        >
                            <TextArea placeholder='请输入 systemPrompt' autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Form.Item>
                        <Form.Item
                            label='userPrompt'
                            name='userPrompt'
                            rules={[{ required: true, message: '请输入 userPrompt' }]}
                        >
                            <TextArea placeholder='请输入 userPrompt' autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Form.Item>
                        <Form.Item label='输入配置'>
                            {state.schema.map((item: any) => {
                                const { name, fieldProps, ...resetItem } = item;
                                return (
                                    <div key={name} style={{ display: 'flex' }}>
                                        {/* @ts-ignore */}
                                        <Field {...resetItem} fieldProps={{ ...fieldProps, disabled: true }} />
                                        <EditOutlined
                                            style={{ marginLeft: 6, height: 30, cursor: 'pointer' }}
                                            title='编辑'
                                            onClick={() => handleFormConfig(item)}
                                        />
                                        <DeleteOutlined
                                            style={{ marginLeft: 6, height: 30, cursor: 'pointer' }}
                                            title='删除'
                                            onClick={() => clearFormConfig(item)}
                                        />
                                    </div>
                                );
                            })}
                            <Button type='primary' ghost onClick={() => handleFormConfig()}>
                                + 添加组件
                            </Button>
                        </Form.Item>
                    </Card>
                </Space>
            </Form>
        </div>
    );
};

export default Index;
