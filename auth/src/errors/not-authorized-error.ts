import {CustomError} from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 200

    constructor() {
        super('Not Authorized')

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.message}];
    }

}
