import { useUnmount } from '@pigjs/utils';
import React from 'react';

import type { DialogResponse } from './dialog';

export function useDialog(dialogInstance: DialogResponse) {
    const instanceRef = React.useRef<null | { show: (options?: Record<string, any>) => void; close: () => void }>(null);

    useUnmount(() => {
        instanceRef.current?.close();
    });

    if (!instanceRef.current) {
        instanceRef.current = dialogInstance();
    }
    const { show, close } = instanceRef.current;
    return [show, close];
}
