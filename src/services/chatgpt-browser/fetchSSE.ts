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
        onError('网络繁忙，请稍后再试');
        return;
    }
    if (!res.ok) {
        // let reason: string;
        try {
            await res.text();
        } catch (err) {
            // reason = res.statusText;
            const msg = `网络繁忙，请稍后再试`;
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
        } catch (err) {
            // ignore
        }
        if (response?.detail?.type === 'invalid_request_error') {
            const error = `网络繁忙，请稍后再试`;

            onError(error);
            // don't feed to the event parser
            return;
        }
        parser.feed(chunk);
    };

    if (res.body?.locked) {
        const error = `网络繁忙，请稍后再试`;
        onError(error);
        return;
    }

    for await (const chunk of streamAsyncIterable(res.body)) {
        // @ts-ignore
        const str = new TextDecoder().decode(chunk);
        feed(str);
    }
}
