export class UserFriendlyException extends Error {
    isCustom: boolean = true;
    statusCode: number = 500;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}