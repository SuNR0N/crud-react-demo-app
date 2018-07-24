export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public message: string,
  ) { 
    super(`[${status} - ${statusText}] ${message}`);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}