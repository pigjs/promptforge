import { createRoot } from 'react-dom/client';

export type DialogResponse = () => { show: (options?: Record<string, any>) => void; close: () => void };

export type DialogFC<T = Record<string, any>> = React.ForwardRefRenderFunction<any, { onClose: () => void } & T>;

/** 创建弹窗 */
export const dialog = (Com: any): DialogResponse => {
    return () => {
        let node: HTMLElement;
        let root: any;
        function close() {
            if (root) {
                root.unmount();
            }
        }
        return {
            show: (options: Record<string, any> = {}) => {
                node = document.createElement('div');
                root = createRoot(node);
                root.render(<Com {...options} onClose={close} />);
            },
            close
        };
    };
};
