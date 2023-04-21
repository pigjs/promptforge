import type { SchemaProps } from '@/components/fieldRender';

export const schema: SchemaProps[] = [
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
];

export const initialValues = {
    namingStyle: '小驼峰命名法',
    nameLength: 10
};
