import { Form, Input, InputNumber, Select } from 'antd';
import React from 'react';

import type { FormInstance, FormItemProps, FormProps, InputNumberProps, InputProps, SelectProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';

const { TextArea } = Input;

const fieldMap = {
    Input,
    TextArea,
    InputNumber,
    Select
};

export type FieldMapProps = {
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

export interface FieldRenderProps extends FormProps {
    schema: SchemaProps[];
}

const Index: React.ForwardRefRenderFunction<FormInstance, FieldRenderProps> = (props, ref) => {
    const { schema = [], initialValues, ...resetProps } = props;

    const [form] = Form.useForm();

    React.useImperativeHandle(ref, () => form);

    return (
        <Form form={form} initialValues={initialValues} {...resetProps}>
            {schema.map((item) => {
                const { valueType, fieldProps = {}, ...resetProps } = item;
                const FC = fieldMap[valueType];
                const { style = {} } = fieldProps;
                const { width = 160 } = style;
                return (
                    <Form.Item key={item.name} {...resetProps}>
                        {/* @ts-ignore */}
                        <FC {...fieldProps} style={{ ...style, width }} />
                    </Form.Item>
                );
            })}
        </Form>
    );
};

export default React.forwardRef(Index);
