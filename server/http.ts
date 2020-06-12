import { NexServer, route, NexRequest, NexResponse } from "../deps.ts";
import { RemoteFunsType, ServerInterface } from "./types.ts";

class HttpServer extends ServerInterface {
  nexServer: NexServer | null = null;

  constructor(port: number) {
    super();
    this.nexServer = new NexServer({ port });
  }

  use(routePrefix: string, funcs: RemoteFunsType) {
    Object.entries(funcs).forEach((c) => {
      route.post(
        `${routePrefix}/${c[0]}`,
        // must be parse serverless func to be sync func
        (req: NexRequest, res: NexResponse) => {
          try {
            const { body: args = [] } = req;
            const result = c[1](...args);
            res.send(result);
          } catch (error) {
            res.send500(error);
          }
        },
      );
    });
  }

  start() {
    this.nexServer?.use(route).start();
  }
}

export default HttpServer;
