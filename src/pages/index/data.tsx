import React from 'react';
import { history } from 'umi';

export const Nav00DataSource = {
    wrapper: { className: 'header0 home-page-wrapper' },
    page: { className: 'home-page' },
    logo: {
        className: 'header0-logo',
        children: (
            <div style={{ display: 'flex', alignItems: 'center', height: 56 }}>
                <img src='/logo.png' style={{ width: 28, height: 28 }} />
                <h1 style={{ fontSize: 18, color: '#fff', fontWeight: 600, marginLeft: 8 }}>Prompt-工坊</h1>
            </div>
        )
    },
    Menu: {
        className: 'header0-menu',
        children: []
    },
    mobileMenu: { className: 'header0-mobile-menu' }
};
export const Banner01DataSource = {
    wrapper: { className: 'banner0' },
    textWrapper: { className: 'banner0-text-wrapper' },
    title: {
        className: 'banner0-title',
        children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png'
    },
    content: {
        className: 'banner0-content',
        children: '专注于快速创建AI应用，帮助您实现智能化创新，探索无限可能'
    },
    button: { className: 'banner0-button', children: '立即使用', onClick: () => history.push('/forge') }
};
export const Content00DataSource = {
    wrapper: { className: 'home-page-wrapper content0-wrapper' },
    page: { className: 'home-page content0' },
    OverPack: { playScale: 0.3, className: '' },
    titleWrapper: {
        className: 'title-wrapper',
        children: [{ name: 'title', children: '产品与服务' }]
    },
    childWrapper: {
        className: 'content0-block-wrapper',
        children: [
            {
                name: 'block0',
                className: 'content0-block',
                md: 8,
                xs: 24,
                children: {
                    className: 'content0-block-item',
                    children: [
                        {
                            name: 'image',
                            className: 'content0-block-icon',
                            children: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png'
                        },
                        {
                            name: 'title',
                            className: 'content0-block-title',
                            children: '零门槛'
                        },
                        { name: 'content', children: '通过简单的 prompt 配置，轻松创建自定义的 AI 应用' }
                    ]
                }
            },
            {
                name: 'block1',
                className: 'content0-block',
                md: 8,
                xs: 24,
                children: {
                    className: 'content0-block-item',
                    children: [
                        {
                            name: 'image',
                            className: 'content0-block-icon',
                            children: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png'
                        },
                        {
                            name: 'title',
                            className: 'content0-block-title',
                            children: '定制化'
                        },
                        {
                            name: 'content',
                            children: '可以灵活定制和调整 AI 应用的功能和行为'
                        }
                    ]
                }
            },
            {
                name: 'block2',
                className: 'content0-block',
                md: 8,
                xs: 24,
                children: {
                    className: 'content0-block-item',
                    children: [
                        {
                            name: 'image',
                            className: 'content0-block-icon',
                            children: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png'
                        },
                        {
                            name: 'title',
                            className: 'content0-block-title',
                            children: '多领域'
                        },
                        {
                            name: 'content',
                            children: '适用于各种不同领域和行业，满足各种应用场景的需求'
                        }
                    ]
                }
            }
        ]
    }
};
export const Content50DataSource = {
    wrapper: { className: 'home-page-wrapper content5-wrapper' },
    page: { className: 'home-page content5' },
    OverPack: { playScale: 0.3, className: '' },
    titleWrapper: {
        className: 'title-wrapper',
        children: [
            { name: 'title', children: '应用案例', className: 'title-h1' },
            {
                name: 'content',
                className: 'title-content'
                // children: '在这里用一段话介绍服务的案例情况'
            }
        ]
    },
    block: {
        className: 'content5-img-wrapper',
        gutter: 16,
        children: [
            {
                name: 'block0',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_1.png'
                    },
                    content: { children: '命名工具' }
                }
            },
            {
                name: 'block1',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_2.png'
                    },
                    content: { children: 'gitCommit生成器' }
                }
            },
            {
                name: 'block2',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_3.png'
                    },
                    content: { children: '智能翻译助手' }
                }
            },
            {
                name: 'block3',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_4.png'
                    },
                    content: { children: '简历优化助手' }
                }
            },
            {
                name: 'block4',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_5.png'
                    },
                    content: { children: '模拟面试工具' }
                }
            },
            {
                name: 'block5',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_6.png'
                    },
                    content: { children: '写作神器' }
                }
            },
            {
                name: 'block6',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_7.png'
                    },
                    content: { children: '标题智能生成' }
                }
            },
            {
                name: 'block7',
                className: 'block',
                md: 6,
                xs: 24,
                children: {
                    wrapper: { className: 'content5-block-content' },
                    img: {
                        children: '/app_8.png'
                    },
                    content: { children: '智能化报告生成' }
                }
            }
        ]
    }
};
export const Content30DataSource = {
    wrapper: { className: 'home-page-wrapper content3-wrapper' },
    page: { className: 'home-page content3' },
    OverPack: { playScale: 0.3 },
    titleWrapper: {
        className: 'title-wrapper',
        children: [
            {
                name: 'title',
                children: '蚂蚁金融云提供专业的服务',
                className: 'title-h1'
            },
            {
                name: 'content',
                className: 'title-content',
                children: '基于阿里云强大的基础资源'
            }
        ]
    },
    block: {
        className: 'content3-block-wrapper',
        children: [
            {
                name: 'block0',
                className: 'content3-block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'content3-icon',
                        children: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png'
                    },
                    textWrapper: { className: 'content3-text' },
                    title: { className: 'content3-title', children: '企业资源管理' },
                    content: {
                        className: 'content3-content',
                        children: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。'
                    }
                }
            },
            {
                name: 'block1',
                className: 'content3-block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'content3-icon',
                        children: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png'
                    },
                    textWrapper: { className: 'content3-text' },
                    title: { className: 'content3-title', children: '云安全' },
                    content: {
                        className: 'content3-content',
                        children: '按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。'
                    }
                }
            },
            {
                name: 'block2',
                className: 'content3-block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'content3-icon',
                        children: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png'
                    },
                    textWrapper: { className: 'content3-text' },
                    title: { className: 'content3-title', children: '云监控' },
                    content: {
                        className: 'content3-content',
                        children: '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。'
                    }
                }
            },
            {
                name: 'block3',
                className: 'content3-block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'content3-icon',
                        children: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png'
                    },
                    textWrapper: { className: 'content3-text' },
                    title: { className: 'content3-title', children: '移动' },
                    content: {
                        className: 'content3-content',
                        children: '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。'
                    }
                }
            },
            {
                name: 'block4',
                className: 'content3-block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'content3-icon',
                        children: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png'
                    },
                    textWrapper: { className: 'content3-text' },
                    title: { className: 'content3-title', children: '分布式中间件' },
                    content: {
                        className: 'content3-content',
                        children:
                            '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。'
                    }
                }
            },
            {
                name: 'block5',
                className: 'content3-block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'content3-icon',
                        children: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png'
                    },
                    textWrapper: { className: 'content3-text' },
                    title: { className: 'content3-title', children: '大数据' },
                    content: {
                        className: 'content3-content',
                        children: '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。'
                    }
                }
            }
        ]
    }
};
export const Footer10DataSource = {
    wrapper: { className: 'home-page-wrapper footer1-wrapper' },
    OverPack: { className: 'footer1', playScale: 0.2 },
    block: {
        className: 'home-page',
        gutter: 0,
        children: [
            {
                name: 'block0',
                xs: 24,
                md: 6,
                className: 'block',
                title: {
                    className: 'logo',
                    children: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg'
                },
                childWrapper: {
                    className: 'slogan',
                    children: [
                        {
                            name: 'content0',
                            children: 'Animation specification and components of Ant Design.'
                        }
                    ]
                }
            },
            {
                name: 'block1',
                xs: 24,
                md: 6,
                className: 'block',
                title: { children: '产品' },
                childWrapper: {
                    children: [
                        { name: 'link0', href: '#', children: '产品更新记录' },
                        { name: 'link1', href: '#', children: 'API文档' },
                        { name: 'link2', href: '#', children: '快速入门' },
                        { name: 'link3', href: '#', children: '参考指南' }
                    ]
                }
            },
            {
                name: 'block2',
                xs: 24,
                md: 6,
                className: 'block',
                title: { children: '关于' },
                childWrapper: {
                    children: [
                        { href: '#', name: 'link0', children: 'FAQ' },
                        { href: '#', name: 'link1', children: '联系我们' }
                    ]
                }
            },
            {
                name: 'block3',
                xs: 24,
                md: 6,
                className: 'block',
                title: { children: '资源' },
                childWrapper: {
                    children: [
                        { href: '#', name: 'link0', children: 'Ant Design' },
                        { href: '#', name: 'link1', children: 'Ant Motion' }
                    ]
                }
            }
        ]
    },
    copyrightWrapper: { className: 'copyright-wrapper' },
    copyrightPage: { className: 'home-page' },
    copyright: {
        className: 'copyright',
        children: (
            <span>
                ©2018 by <a href='https://motion.ant.design'>Ant Motion</a> All Rights Reserved
            </span>
        )
    }
};
