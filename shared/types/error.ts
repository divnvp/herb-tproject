export type Error = {
  status: number;
  data: {
    message: string;
    code: string;
  };
};

export type ResponseError = {
  detail: DetailOfResponseError;
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
