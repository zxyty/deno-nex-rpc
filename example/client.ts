
import NexRpcClient from '../client/index.ts';

const serverIns = NexRpcClient.getServer("http", 30001);

// invoke
serverIns.add(1, 2, (res: any) => {
    console.log(res);
});

serverIns.add(1, 4, (res: any) => {
    console.log(res);
});
