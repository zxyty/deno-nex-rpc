import Http from "./http.ts";
import { ServerInterface, RemoteFunsType, ServerType } from "./types.ts";
import { MessagePrefix } from "../message.ts";

class NexRpcServer {
  private _server: ServerInterface | null = null;

  private _serverType: ServerType = "http";

  private _serverPrefix: string = MessagePrefix;

  constructor(type: ServerType = "http", port: number) {
    if (type === "http") {
      this._server = new Http(port) as any;
    }

    this._serverType = type;
  }

  methods(funcs: RemoteFunsType) {
    this._server!.methods = funcs;

    this.processMethods(funcs);
  }

  start() {
    this._server!.start();
  }

  private processMethods(funcs: RemoteFunsType) {
    if (this._serverType === "http") {
      this._server?.use(this._serverPrefix, funcs);
    }
  }
}

export default NexRpcServer;
