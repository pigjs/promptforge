import type { TourProps } from 'antd';

export function getTourSteps(options: { mobile: boolean; ref1: any; ref2: any; ref3: any }) {
    const { mobile, ref1, ref2, ref3 } = options;

    const baseSteps: TourProps['steps'] = mobile
        ? [
              {
                  title: '应用设置',
                  description: '点击这里，这里可以查看应用说明，及使用示例，同时可以根据自己的需要，选择不同的配置项',
                  target: () => ref1.current
              }
          ]
        : [
              {
                  title: '应用描述',
                  description: '这里可以查看应用说明，及使用示例',
                  target: () => ref1.current
              },
              {
                  title: '应用设置',
                  description: '可以根据自己的需要，选择不同的配置项',
                  target: () => ref2.current
              }
          ];

    const steps: TourProps['steps'] = [
        ...baseSteps,
        {
            title: '发送消息',
            description: '输入内容，按回车键发送或点击发送图标，即可发送消息',
            target: () => ref3.current
        }
    ];

    return steps;
}
