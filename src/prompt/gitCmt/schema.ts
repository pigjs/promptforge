import type { SchemaProps } from '@/components/fieldRender';

export const schema: SchemaProps[] = [
    {
        name: 'locale',
        label: '语言',
        valueType: 'Select',
        fieldProps: {
            style: {
                width: 140
            },
            options: [
                { label: '中文', value: '中文' },
                { label: '英文', value: '英文' }
            ]
        },
        rules: [{ required: true, message: '请选择语言' }]
    }
];

export const initialValues = {
    locale: '中文'
};
