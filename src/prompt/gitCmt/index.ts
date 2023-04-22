import { prompt } from './prompt';
import { initialValues, schema } from './schema';

export default {
    title: 'git commit 信息生成器',
    description: '根据输入的描述信息，生成对应的 git commit 信息',
    prompt,
    schema,
    initialValues
};
