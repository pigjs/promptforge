import localforage from 'localforage';

localforage.config({
    name: 'promptforge',
    version: 1,
    // 最多 50 MB
    size: 50 * 1024 * 1024,
    description: 'promptforge storge'
});

export default localforage;
