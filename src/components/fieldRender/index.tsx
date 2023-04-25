import MessageList from '@/components/messageList';
import { Divider, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';

import type { MessageListProps } from '@/components/messageList';
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

export type ConversationType = {
    role: 'user';
    content: string;
};

export interface FieldRenderProps extends MessageListProps {
    schema: SchemaProps[];
    onSend?: (values: Record<string, any>) => void;
    initialValues?: Record<string, any>;
    title: string;
    description: string;
}

const Index = (props: FieldRenderProps) => {
    const { schema = [], onSend, loading, initialValues = {}, title, description, ...resetProps } = props;

    const [form] = Form.useForm();

    const onPressEnter = async (event: any) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            console.log(event, 'event');
            event.preventDefault();
            // 判断是否处于中文输入状态
            if (event.target.composing) {
                return;
            }
            const values = await form.validateFields();
            onSend?.(values);
            form.setFieldValue('prompt', '');
        }
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
                <div
                    style={{
                        height: isEmptyArray(schema) ? '55vh' : '45vh',
                        width: '100%',
                        overflow: 'auto',
                        marginBottom: 10
                    }}
                >
                    <ScrollableFeed>
                        <MessageList loading={loading} {...resetProps} />
                    </ScrollableFeed>
                </div>
                <Form.Item name='prompt' noStyle rules={[{ required: true, message: 'Send a message...' }]}>
                    <TextArea
                        onKeyDown={onPressEnter}
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        disabled={loading}
                        placeholder='Send a message...'
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default React.memo(Index);
