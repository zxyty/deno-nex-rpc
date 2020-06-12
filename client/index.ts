import { defaultHttpPort, getServerHttpAddr } from "./config.ts";
import { ClientInvokeMethod, ClientType } from "./types.ts";
import { MessagePrefix } from "../message.ts";
import Request from "./request.ts";

const processClientMethodProxy = (client: SingleRpcClient) => {
  return new Proxy(client, {
    get(self: any, method) {
      if (self[method]) {
        return self[method];
      }
      return (...args: any[]) => client.invoke(method as string, args);
    },
  });
};

class SingleRpcClient extends Request {
  private _port: number = defaultHttpPort;

  private _type: ClientType = "http";

  static shareClinetIns: SingleRpcClient = processClientMethodProxy(
    new SingleRpcClient(),
  );

  static getServer(type: ClientType = "http", port = 30001) {
    SingleRpcClient.shareClinetIns.setPort(port);
    SingleRpcClient.shareClinetIns.setType(type);

    return SingleRpcClient.shareClinetIns as
      & SingleRpcClient
      & ClientInvokeMethod;
  }

  setType(type: ClientType = "http") {
    this._type = type;
  }

  setPort(port?: number) {
    this._port = port || defaultHttpPort;
  }

  invoke(method: string, args: any[] = []) {
    const callback = args.pop();
    if (callback && !(callback instanceof Function)) {
      // 属于请求参数
      args.push(callback);
    }
    this.fetch(this.getRpcRequestUrl(method), args, callback);
  }

  private getRpcRequestUrl(method: string) {
    return `${getServerHttpAddr()}:${this._port}${MessagePrefix}/${method}`;
  }

  private async fetch(url: string, params: any, callback?: Function) {
    if (this._type === "http") {
      this.http(url, params).then((res) => {
        if (callback) {
          callback(res);
        }
      });
    }
    // Todo other type fetch
  }
}

export default SingleRpcClient;
