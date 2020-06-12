export interface ClientInterface {}

export type ClientType = "http" | "https" | "tcp";

export interface ClientInvokeMethod {
  [method: string]: Function;
}
