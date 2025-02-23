class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [], 
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null; // Typically used to hold the data object
        this.success = false; // Typically used to indicate failure
        this.errors = errors; // Assign the errors array to this.errors

        // Capture stack trace if no custom stack is provided
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
