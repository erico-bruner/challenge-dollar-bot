export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type ResponseApiParams = {
  USDBRL: {
    code: string,
    codein: string,
    name: string,
    high: number,
    low: number,
    varBid:number,
    pctChange: number,
    bid: number,
    ask: number,
    timestamp: number,
    create_date: number,
  }
}