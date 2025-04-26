export type Error = {
  status: number;
  data: {
    message: string;
    code: string;
  };
};
