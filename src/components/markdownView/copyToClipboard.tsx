import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Index = (props: { text: string }) => {
    const { text } = props;
    const [isCopied, setIsCopied] = React.useState(false);

    const onCopy = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };
    return (
        <CopyToClipboard text={text} onCopy={onCopy}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 8 }}>{isCopied ? <CheckOutlined /> : <CopyOutlined />}</div>
                <div>{isCopied ? 'Copied!' : 'Copy code'}</div>
            </div>
        </CopyToClipboard>
    );
};

export default React.memo(Index);
