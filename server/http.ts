import { NexServer, route, NexRequest, NexResponse } from "../deps.ts";
import { RemoteFunsType, ServerInterface } from "./types.ts";
import { setRemoteSourceRefreshTime, getRemoteSourceRefreshTime } from "./config.ts";

setTimeout(setRemoteSourceRefreshTime);

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
            if (typeof c[1] === "string" && c[1].startsWith("http")) {
              import(`${c[1]}?t=${getRemoteSourceRefreshTime()}`).then(module => {
                const result = module.default(...args);
                res.send(result);
              });
            } else if (typeof c[1] === "function") {
              const result = c[1](...args);
              res.send(result);
            } else {
              res.send("");
            }
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
