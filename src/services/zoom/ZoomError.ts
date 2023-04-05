export type InitData = {
  status: number,
  // eslint-disable-next-line
  data: any,
};

class ZoomError extends Error {
  status: number;
  // eslint-disable-next-line
  data: any;

  constructor({status, data}: InitData) {
    const message = "Zoom Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export {ZoomError};
