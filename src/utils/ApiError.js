//The ApiError class standardizes how errors are created and passed through your backend, ensuring all errors have a consistent structure and useful information

class ApiError extends Error {
    constructor( // this runs when we create an new error
        statusCode,
        message="Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}
export { ApiError }