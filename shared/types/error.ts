export type Error = {
  status: number;
  data: ResponseError;
};

export type ResponseError = {
  detail: DetailOfResponseError | string;
};
type DetailOfResponseError = {
  code: string;
  detail: string;
  messages: MessageOfDetailOfResponseError[];
};
type MessageOfDetailOfResponseError = {
  message: string;
  token_class: string;
  token_type: string;
};
