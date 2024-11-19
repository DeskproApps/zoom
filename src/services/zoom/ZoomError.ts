export type InitData = {
  status: number,
  data: {
    code?: number,
    message?: string,
    reason?: string,
    error?: string,
  },
};

class ZoomError extends Error {
  status: InitData["status"];
  data: InitData["data"];

  constructor({ status, data }: InitData) {
    const message = "Zoom Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export {ZoomError};
