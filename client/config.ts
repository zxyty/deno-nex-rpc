let HttpServerAddr = "http://localhost";

export const defaultHttpPort = 30001;

export const getServerHttpAddr = () => {
  return HttpServerAddr;
};

export const setServerHttpAddr = (addr: string) => {
  HttpServerAddr = addr;
};
