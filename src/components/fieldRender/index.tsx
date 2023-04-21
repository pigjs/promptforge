import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import { Avatar, Divider, Form, Input, InputNumber, List, Select } from 'antd';
import React, { Fragment } from 'react';

import type { FormItemProps, InputNumberProps, InputProps, SelectProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';

import { isEmptyArray } from '@pigjs/utils';
import styles from './index.less';

const { TextArea } = Input;

const fieldMap = {
    Input,
    TextArea,
    InputNumber,
    Select
};

type FieldMapProps = {
    Input: InputProps;
    InputNumber: InputNumberProps;
    Select: SelectProps;
    TextArea: TextAreaProps;
};

export interface SchemaProps<Value extends keyof typeof fieldMap = keyof typeof fieldMap>
    extends Omit<FormItemProps, 'name' | 'valueType'> {
    valueType: Value;
    fieldProps: FieldMapProps[Value];
    name: string;
}

export type MessageListType = {
    response?: string;
    prompt: string;
    error?: string;
};

export interface FieldRenderProps {
    schema: SchemaProps[];
    onSend?: (values: Record<string, any>) => void;
    loading?: boolean;
    initialValues?: Record<string, any>;
    messageList: MessageListType[];
    title: string;
    description: string;
}

const Index = (props: FieldRenderProps) => {
    const { schema = [], onSend, loading, initialValues = {}, messageList, title, description } = props;

    const [form] = Form.useForm();

    const onPressEnter = async (event: any) => {
        event.preventDefault();
        const values = await form.validateFields();
        onSend?.(values);
        form.setFieldValue('prompt', '');
    };

    return (
        <div className={styles.fieldRender}>
            <Form layout='inline' form={form} initialValues={initialValues}>
                <div className={styles.fieldRender_title}>{title}</div>
                <div className={styles.fieldRender_description}>{description}</div>
                <Divider />
                {schema.map((item) => {
                    const { valueType, fieldProps, ...resetProps } = item;

                    const FC = fieldMap[valueType];

                    return (
                        <Form.Item key={item.name} {...resetProps}>
                            {/* @ts-ignore */}
                            <FC {...fieldProps} />
                        </Form.Item>
                    );
                })}
                {!isEmptyArray(schema) && <Divider />}
                <div style={{ height: '45vh', width: '100%', overflow: 'auto' }}>
                    <List
                        style={{ width: '100%' }}
                        dataSource={messageList}
                        itemLayout='horizontal'
                        locale={{ emptyText: '暂无消息' }}
                        loading={loading}
                        renderItem={(item, index) => {
                            return (
                                <Fragment key={index}>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar style={{ backgroundColor: '#87d068' }}>BA</Avatar>}
                                            title={<code>{item.prompt}</code>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar style={{ backgroundColor: 'rgb(22, 129, 255)' }}>CH</Avatar>
                                            }
                                            title={
                                                item.error ? (
                                                    <span style={{ color: '#ef4146' }}>{item.error}</span>
                                                ) : (
                                                    <code>{item.response}</code>
                                                )
                                            }
                                        />
                                    </List.Item>
                                </Fragment>
                            );
                        }}
                    />
                </div>
                <Form.Item name='prompt' noStyle rules={[{ required: true, message: 'Send a message...' }]}>
                    <TextArea
                        onPressEnter={onPressEnter}
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        disabled={loading}
                        suffix={
                            loading ? (
                                <LoadingOutlined />
                            ) : (
                                <SendOutlined style={{ transform: 'rotate3d(1,1,1,300deg)' }} />
                            )
                        }
                        placeholder='Send a message...'
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default React.memo(Index);
