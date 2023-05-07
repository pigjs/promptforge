import type { SchemaProps } from '@/components/fieldRender';

/** 选择组件 */
export const selectComp = [
    { label: '输入框', value: 'Input' },
    { label: '下拉框', value: 'Select' },
    { label: '颜色', value: 'Color' },
    { label: '数字输入框', value: 'InputNumber' },
    { label: '文本域', value: 'TextArea' },
    { label: '复选框', value: 'Checkbox' }
];

export const basePropsConfig: SchemaProps[] = [
    {
        label: '标签名称',
        name: 'label',
        valueType: 'Input',
        fieldProps: {
            placeholder: '请输入标签名称'
        },
        rules: [{ required: true, message: '请输入标签名称' }]
    },
    {
        label: '字段名称',
        name: 'name',
        valueType: 'Input',
        fieldProps: {
            placeholder: '请输入字段名称'
        },
        rules: [{ required: true, message: '请输入字段名称' }]
    },
    {
        label: '初始值',
        name: 'initialValue',
        valueType: 'Input',
        fieldProps: {
            placeholder: '请设置初始值'
        }
    },
    {
        label: '是否必填',
        name: 'required',
        valueType: 'Checkbox'
    }
];

export const placeholderConfig: SchemaProps = {
    label: '占位符',
    name: 'placeholder',
    valueType: 'Input',
    fieldProps: {
        placeholder: '请输入占位符'
    }
};

/** 颜色属性配置 */
export const colorPropsConfig: SchemaProps[] = [];

/** 输入框属性配置 */
export const inputPropsConfig: SchemaProps[] = [placeholderConfig];

/** 数字输入框属性配置 */
export const inputNumberPropsConfig: SchemaProps[] = [
    placeholderConfig,
    {
        label: '最大值',
        name: 'max',
        valueType: 'InputNumber'
    },
    {
        label: '最小值',
        name: 'min',
        valueType: 'InputNumber'
    }
];

/** 文本域属性配置 */
export const textAreaPropsConfig: SchemaProps[] = [placeholderConfig];

/** 下拉框属性配置 */
export const selectPropsConfig: SchemaProps[] = [
    placeholderConfig,
    {
        label: '是否多选',
        name: 'mode',
        valueType: 'Checkbox'
    },
    {
        label: '添加选项',
        name: 'options',
        valueType: 'FieldList'
    }
];

/** 复选框属性配置 */
export const checkboxPropsConfig: SchemaProps[] = [
    {
        label: '选项',
        name: 'children',
        valueType: 'Input',
        fieldProps: {
            placeholder: '请输入选项'
        }
    }
];

/** 属性配置枚举 */
export const propsConfigEnum = {
    Color: colorPropsConfig,
    Input: inputPropsConfig,
    InputNumber: inputNumberPropsConfig,
    TextArea: textAreaPropsConfig,
    Select: selectPropsConfig,
    Checkbox: checkboxPropsConfig
};
