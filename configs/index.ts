const configs = {
    dev: {
        proxy: {
            '/api': {
                target: 'http://localhost:8908/api/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/openai': {
                target: 'http://codehub.pigjs.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/openai': ''
                }
            }
        }
    },
    test: {
        proxy: {
            '/api': {
                target: 'http://localhost:8908/api/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/openai': {
                target: 'http://codehub.pigjs.com/',
                changeOrigin: true
            }
        }
    },
    prod: {
        proxy: {
            '/api': {
                target: 'http://localhost:8908/api/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/openai': {
                target: 'http://codehub.pigjs.com/',
                changeOrigin: true
            }
        }
    }
};

type configKeys = keyof typeof configs;

const APP_ENV = (process.env.APP_ENV as configKeys) || 'dev';

export default configs[APP_ENV];
