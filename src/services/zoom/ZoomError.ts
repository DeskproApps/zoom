export type InitData = {
  status: number,
  data: {
    code: number,
    message: string,
  },
};

class ZoomError extends Error {
  status: number;
  data: {
    code: number,
    message: string,
  };

  constructor({ status, data }: InitData) {
    const message = "Zoom Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export {ZoomError};
