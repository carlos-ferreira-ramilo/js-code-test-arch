export default class Response<T> {
  constructor(
    public success: boolean,
    public data: T | undefined,
    public err: any | undefined
  ) {
    this.success = success;
    this.data = data;
    this.err = err;
  }
}
