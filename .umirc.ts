import { resolve } from 'path';
import { defineConfig } from 'umi';
import config from './configs/index';

export default defineConfig({
    npmClient: 'pnpm',
    title: 'Prompt工坊',
    alias: {
        '@': resolve(__dirname, './src')
    },
    favicons: ['logo.jpg'],
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
        // 启用 asyncWebAssembly 实验特性
        config.experiments({ layers: true, asyncWebAssembly: true });
        // 修改 exclude 规则来排除 .wasm 文件
        config.module
            .rule('exclude-wasm')
            .exclude.add(/\.wasm$/)
            .end();
    },
    plugins: ['@umijs/plugins/dist/initial-state', '@umijs/plugins/dist/model'],
    initialState: {},
    model: {},
    ...config
});
