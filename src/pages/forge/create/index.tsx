import Color from '@/components/color';
import { useDialog } from '@/components/dialog';
import FeatureIcon from '@/components/featureIcon';
import Field from '@/components/field';
import formConfigDialog from '@/components/formConfigDialog';
import { createForge, getEditDetail, saveDraft, updateForge } from '@/services/forge';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { getUrlParam, isNil, omit, useMount, useSetState } from '@pigjs/utils';
import { Button, Card, Form, Input, message, Modal, Select, Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';

import type { FieldProps } from '@/components/field';

import styles from './index.less';

const { TextArea } = Input;

const Index = () => {
    const [id, setId] = React.useState(() => {
        return getUrlParam('id');
    });

    const [detail, setDetail] = React.useState<any>(null);

    const [formConfigShow] = useDialog(formConfigDialog);
    const [state, setState] = useSetState<any>({
        initialValues: {},
        schema: []
    });

    const { initialState } = useModel('@@initialState');

    const { categoryOptions } = initialState;

    const [form] = Form.useForm();

    const getData = async () => {
        if (!id) {
            return;
        }
        const res = await getEditDetail(id);
        const data = res.data || {};
        const { initialValues, schema, prompt, ...resetData } = data;
        try {
            const resetInitialValues = initialValues ? JSON.parse(initialValues) : {};
            const resetSchema = schema ? JSON.parse(schema) : [];
            const resetPrompt: any = prompt ? JSON.parse(prompt) : {};
            const { userPrompt = {}, systemPrompt = {} } = resetPrompt;
            setDetail({
                ...resetData,
                userPrompt,
                systemPrompt
            });
            setState({
                initialValues: resetInitialValues,
                schema: resetSchema
            });
        } catch (err) {
            console.error('解析应用配置错误：', err);
            Modal.error({
                title: '温馨提示',
                content: '解析应用配置错误，请刷新重试'
            });
        }
    };

    useMount(() => {
        getData();
    });

    const submit = async () => {
        const values = await form.validateFields();
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
        if (id) {
            await updateForge({ ...data, id });
        } else {
            await createForge(data);
        }
        message.success('提交成功');
        history.back();
    };

    const preview = async () => {
        const values = await form.validateFields();
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
        if (id) {
            data.id = id;
        }
        const res = await saveDraft(data);
        const forge = res.data || {};
        const { id: forgeId } = forge;
        console.log(forgeId, 'forgeId');
        console.log(typeof forgeId);
        setId(forgeId);
        message.success('保存成功');
        // 等 message 提示了之后再跳转，优化一下体验
        setTimeout(() => {
            window.open(`/feature?id=${id || forgeId}&preview=true`);
        }, 100);
    };

    const name = Form.useWatch('name', { form });
    const icon = Form.useWatch('icon', { form });
    const color = Form.useWatch('color', { form });

    const handleFormConfig = (row?: FieldProps) => {
        const onOk = (item: FieldProps, initialValue?: string) => {
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

    if (id && isNil(detail)) {
        return null;
    }
    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>{id ? '编辑应用' : '创建应用'}</div>
                <div style={{ marginLeft: 'auto' }}>
                    <Space>
                        <Button onClick={preview}>保存并预览</Button>
                        <Button type='primary' onClick={submit}>
                            提交
                        </Button>
                    </Space>
                </div>
            </div>
            <Form
                initialValues={detail || { color: '#1681ff' }}
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
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
