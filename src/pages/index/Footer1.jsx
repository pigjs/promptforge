import { isImageUrl } from '@/utils/image';
import { Col, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import React from 'react';
import { getChildrenToRender } from './utils';

class Footer extends React.Component {
    static defaultProps = {
        className: 'footer1'
    };

    getLiChildren = (data) =>
        data.map((item, i) => {
            const { title, childWrapper, ...itemProps } = item;
            return (
                <Col key={i.toString()} {...itemProps} title={null} content={null}>
                    <h2 {...title}>
                        {typeof title.children === 'string' && isImageUrl(title.children) ? (
                            <img src={title.children} width='100%' alt='img' />
                        ) : (
                            title.children
                        )}
                    </h2>
                    <div {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</div>
                </Col>
            );
        });

    render() {
        const { ...props } = this.props;
        const { dataSource } = props;
        delete props.dataSource;
        delete props.isMobile;
        const childrenToRender = this.getLiChildren(dataSource.block.children);
        return (
            <div {...props} {...dataSource.wrapper}>
                <OverPack {...dataSource.OverPack}>
                    <QueueAnim type='bottom' key='ul' leaveReverse component={Row} {...dataSource.block}>
                        {childrenToRender}
                    </QueueAnim>
                    <TweenOne
                        animation={{ y: '+=30', opacity: 0, type: 'from' }}
                        key='copyright'
                        {...dataSource.copyrightWrapper}
                    >
                        <div {...dataSource.copyrightPage}>
                            <div {...dataSource.copyright}>{dataSource.copyright.children}</div>
                        </div>
                    </TweenOne>
                </OverPack>
            </div>
        );
    }
}

export default Footer;
