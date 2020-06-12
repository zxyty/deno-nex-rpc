## Simple Deno Rpc Server & Client

### Server Regist Serverless Methods
```ts
import NexRpcServer from './server/index.ts';

const rpcServer = new NexRpcServer("http", 30001);

rpcServer.methods({
    add: (a: number, b: number) => {
        return a + b;
    }
});

rpcServer.start();
```

### Client Call Serverless Methods
```ts
import NexRpcClient from './client/index.ts';

const serverIns = NexRpcClient.getServer("http", 30001);

// invoke
serverIns.add(1, 2, (res: any) => {
    console.log(res);
});

serverIns.add(1, 4, (res: any) => {
    console.log(res);
});

// $ deno run --allow-net d:/code/lab/deno-nex-rpc/client.ts
// Compile file:///D:/code/lab/deno-nex-rpc/client.ts
// 3
// 5
```
