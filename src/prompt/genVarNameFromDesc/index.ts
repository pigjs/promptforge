import { prompt } from './prompt';
import { initialValues, schema } from './schema';

export default {
    title: '命名工具',
    description: '根据输入的参数和描述信息，生成对应的方法或变量名称',
    prompt,
    schema,
    initialValues
};
