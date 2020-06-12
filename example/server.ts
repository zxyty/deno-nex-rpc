import NexRpcServer from '../server/index.ts';
import { setRemoteSourceRefreshTime } from '../server/config.ts';

const server = new NexRpcServer("http", 30001);

// 12 Hours
setRemoteSourceRefreshTime(1000 * 60 * 60 * 12);

server.methods({
    add: 'https://gitee.com/zxyty/deno-ssr-mock/raw/master/add.ts',
});

server.start();
