import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from './copyToClipboard';

import styles from './index.less';

const Index = ({ source, loading }: { source: string }) => {
    const components = {
        // @ts-ignore
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <div className={styles.markdownView}>
                    <div className={styles.markdownView_header}>
                        <div>{match[1]}</div>
                        <CopyToClipboard text={String(children).replace(/\n$/, '')} />
                    </div>
                    <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={materialDark}
                        language={match[1]}
                        PreTag='div'
                        customStyle={{ margin: 0 }}
                    />
                </div>
            ) : (
                <code {...props} className={className} style={{ color: '#fff' }}>
                    {children}
                </code>
            );
        }
    };
    // const loading = true;
    // @ts-ignore
    return (
        <ReactMarkdown className={`${loading ? styles.chatContent : ''}`} components={components}>
            {source}
        </ReactMarkdown>
    );
};

export default React.memo(Index);
