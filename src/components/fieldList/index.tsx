import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

import type { FormListProps as AFormListProps } from 'antd/es/form/FormList';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const formItemLayoutWithOutLabel = {
    wrapperCol: { span: 16, offset: 8 }
};

export interface FieldListProps extends AFormListProps {
    label: string;
}

const Index = (props: FieldListProps) => {
    const { name, label, ...resetProps } = props;
    return (
        <Form.List
            name={name}
            rules={[
                {
                    validator: async (_, names) => {
                        if (!names || names.length < 2) {
                            return Promise.reject(new Error('至少要有2个选项'));
                        }
                    }
                }
            ]}
            {...resetProps}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? label : ''}
                            required={false}
                            key={field.key}
                        >
                            <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: '请输入选项'
                                    }
                                ]}
                                noStyle
                            >
                                <Input placeholder='请输入选项' style={{ width: '60%' }} />
                            </Form.Item>
                            {fields.length > 1 ? (
                                <MinusCircleOutlined style={{ marginLeft: 6 }} onClick={() => remove(field.name)} />
                            ) : null}
                        </Form.Item>
                    ))}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type='dashed' onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                            添加选项
                        </Button>
                        <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};

export default React.memo(Index);
