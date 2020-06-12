export interface RemoteFunsType {
  [method: string]: Function | String; // func or url link
}

export class ServerInterface {
  methods: RemoteFunsType | null = null;

  start() {}

  use(routePrefix: string, funcs: RemoteFunsType) {}
}

export type ServerType = "http" | "https" | "tcp";
