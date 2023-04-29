import { resolve } from 'path';
import { defineConfig } from 'umi';
import config from './configs/index';

export default defineConfig({
    npmClient: 'pnpm',
    title: 'Prompt-工坊',
    alias: {
        '@': resolve(__dirname, './src')
    },
    favicons: ['logo.png'],
    mfsu: false,
    hash: true,
    conventionRoutes: {
        exclude: [/\/components\//, /\/utils\//]
    },
    lessLoader: {
        javascriptEnabled: true,
        math: 'always'
    },
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
            },
            'antd'
        ]
    ],
    // @ts-ignore
    chainWebpack(config, { webpack }) {
        config
            .plugin('replace')
            .use(webpack.ContextReplacementPlugin)
            .tap(() => {
                return [/moment[/\\]locale$/, /zh-cn/];
            });
    },
    ...config
});
