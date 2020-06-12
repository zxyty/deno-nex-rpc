export default class Request {
  protected http(url: string, args: any = {}): Promise<any> {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((res) => res.json()).catch((err) => {
      console.log(err);
    });
  }
}
