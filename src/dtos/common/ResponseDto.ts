export class ResponseDto<T> {
    Error: any;
    Result?: T | null;
    Success: boolean;
    TargetUrl?: string | null;
    UnAuthorizedRequest: boolean;
    StatusCode?: number;
    LogError?: any

    constructor(
        result: T,
        success: boolean,
        unAuthorizedRequest: boolean,
        targetUrl: string | null = null,
        error: any = null,
        statusCode?: number,
        logError?: any) {
        this.Error = error
        this.Result = result
        this.Success = success
        this.TargetUrl = targetUrl
        this.UnAuthorizedRequest = unAuthorizedRequest
        this.StatusCode = statusCode
        this.LogError = logError
    }


    public static async ReturnResult<R>(el: () => Promise<R>): Promise<ResponseDto<R | null>> {
        try {
            //Taking all the inputs for audit log
            const val = await el();
            return this.GetResult(val);
        } catch (error: any) {

            // logger.error(JSON.stringify(error))
            if (error.isCustom) {
                return this.GetError(error.message, error.statusCode, error);
            } else {
                return this.GetError("Internal Server Error", 500, error);
            }

        }
    }

    public static GetResult<R>(result: R): ResponseDto<R> {
        return new ResponseDto<R>(result, true, false, '');
    }

    public static GetError<E>(message: string, statusCode: number, err?: any): ResponseDto<null> {
        return new ResponseDto<null>(null, false, false, '', message, statusCode, err);
    }
}

