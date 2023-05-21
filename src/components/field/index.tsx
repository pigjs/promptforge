import Color from '@/components/color';
import FieldList from '@/components/fieldList';
import { Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import Checkbox from './checkbox';

import type { ColorProps } from '@/components/color';
import type { FieldListProps } from '@/components/fieldList';
import type { FormItemProps, InputNumberProps, InputProps, SelectProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import type { CheckboxProps } from './checkbox';

const { TextArea } = Input;

export const fieldMap = {
    Input,
    TextArea,
    InputNumber,
    Select,
    Color,
    Checkbox,
    FieldList
};

export type FieldMapProps = {
    Input: InputProps;
    InputNumber: InputNumberProps;
    Select: SelectProps;
    TextArea: TextAreaProps;
    Color: ColorProps;
    Checkbox: CheckboxProps;
    FieldList: FieldListProps;
};

export interface FieldProps<Value extends keyof typeof fieldMap = keyof typeof fieldMap>
    extends Omit<FormItemProps, 'name' | 'valueType'> {
    valueType: Value;
    fieldProps?: FieldMapProps[Value];
    name: string;
    width?: number;
}

const Index = (props: FieldProps) => {
    const { valueType, fieldProps = {}, width: defaultWidth = 160, ...resetProps } = props;
    const FC = fieldMap[valueType];
    // @ts-ignore
    const { style = {} } = fieldProps;
    const { width = defaultWidth } = style;
    const { name } = resetProps;
    if (valueType === 'FieldList') {
        // @ts-ignore
        return <FC key={name} {...resetProps} style={{ ...style, width }} />;
    }
    return (
        <Form.Item key={name} {...resetProps}>
            {/* @ts-ignore */}
            <FC {...fieldProps} style={{ ...style, width }} />
        </Form.Item>
    );
};

export default React.memo(Index);
