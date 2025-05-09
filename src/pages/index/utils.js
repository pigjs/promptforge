import { isImageUrl } from '@/utils/image';
import { Button } from 'antd';
import React from 'react';

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
export const getChildrenToRender = (item, i) => {
    let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
    tag = item.href ? 'a' : tag;
    let children =
        typeof item.children === 'string' && isImageUrl(item.children)
            ? React.createElement('img', { src: item.children, style: { width: '100%', height: '100%' }, alt: 'img' })
            : item.children;
    if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
        children = React.createElement(Button, {
            ...item.children
        });
    }
    return React.createElement(tag, { key: i.toString(), ...item }, children);
};
