import { createParser } from 'eventsource-parser';
import { streamAsyncIterable } from './streamAsyncIterable';

export type StreamType = {
    onMessage: (data: string) => void;
    onError: (error: any) => void;
};

export async function fetchSSE(url: string, options: Parameters<typeof fetch>[1] & StreamType) {
    const { onMessage, onError: onErr, ...fetchOptions } = options;
    let res: any;
    const onError = (error: string) => {
        if (onErr) {
            onErr(error);
        } else {
            console.error(error);
        }
    };
    try {
        res = await fetch(url, fetchOptions);
    } catch (err) {
        onError('ChatGPT error');
        return;
    }
    if (!res.ok) {
        let reason: string;
        try {
            reason = await res.text();
        } catch (err) {
            reason = res.statusText;
            const msg = `ChatGPT error ${res.status}: ${reason}`;
            onError(msg);
            return;
        }
    }
    const parser = createParser((event) => {
        if (event.type === 'event') {
            onMessage(event.data);
        }
    });
    const feed = (chunk: string) => {
        let response = null;
        try {
            response = JSON.parse(chunk);
        } catch {
            // ignore
        }
        if (response?.detail?.type === 'invalid_request_error') {
            const error = `ChatGPT error ${response.detail.message}: ${response.detail.code} (${response.detail.type})`;

            onError(error);
            // don't feed to the event parser
            return;
        }
        parser.feed(chunk);
    };

    if (res.body?.locked) {
        const error = `ChatGPT error`;
        onError(error);
        return;
    }

    for await (const chunk of streamAsyncIterable(res.body)) {
        // @ts-ignore
        const str = new TextDecoder().decode(chunk);
        feed(str);
    }
}
