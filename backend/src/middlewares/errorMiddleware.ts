export class ErrorMiddleware extends Error {
  message: string;
  statusCode: number
  

  constructor(message: string, statusCode:number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode
  }
   toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode
    };
  }
}