import MarkdownView from '@/components/markdownView';
import { performQueryStream } from '@/services/performQueryStream';
import { Button } from 'antd';
import React from 'react';

const template =
    "好的，以下是一个简单的 React 组件示例：\n\n```jsx\nimport React from 'react';\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      count: 0\n    };\n  }\n\n  handleClick = () => {\n    this.setState(prevState => ({\n      count: prevState.count + 1\n    }));\n  }\n\n  render() {\n    return (\n      <div>\n        <h1>My Component</h1>\n        <p>Count: {this.state.count}</p>\n        <button onClick={this.handleClick}>Click me</button>\n      </div>\n    );\n  }\n}\n\nexport default MyComponent;\n```\n\n这个组件包含一个计数器，每次点击按钮时计数器会加一。在 `render` 方法中，我们使用 JSX 语法来构建组件的 UI。注意，我们使用 `this.state` 来存储组件的状态，并使用 `this.setState` 方法来更新状态。最后，我们将组件导出以便在其他地方使用。";

const Index = () => {
    const [value, setValue] = React.useState<string>('');

    const onSend = async () => {
        const res = await performQueryStream({
            userPrompt: '什么是Promise',
            systemPrompt: '你是一个问答机器人',
            onProgress: (content: string) => {
                console.log(content);
                setValue((val) => `${val}${content}`);
            }
        });
        console.log(res);
    };

    return (
        <div>
            <Button onClick={onSend}>发送</Button>
            <div>响应的内容：{value}</div>
            <MarkdownView source={template} />
        </div>
    );
};

export default Index;
