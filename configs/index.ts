const configs = {
    local: {
        proxy: {
            '/api': {
                target: 'http://localhost:8908/api/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    test: {
        proxy: {
            '/api': {
                target: 'https://www.promptforge.cn',
                changeOrigin: true
            }
        }
    },
    prod: {
        proxy: {
            '/api': {
                target: 'https://www.promptforge.cn',
                changeOrigin: true
            }
        },
        headScripts: [
            `var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d008dfc9b022ed2bf20baaa538d0de8d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();`
        ]
    }
};

type configKeys = keyof typeof configs;

const APP_ENV = (process.env.APP_ENV as configKeys) || 'prod';

export default configs[APP_ENV];
