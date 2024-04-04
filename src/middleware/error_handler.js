/**
 * Error handler middleware
 * Avoid try-catch blocks in controllers
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * Error handler middleware
 * Handle the logging and response to the client in case of errro
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    req.log.error(err.stack)

    let statusCode = err.status || 500
    let message = err.message || "Internal Server Error"
    let code = err.code || "INTERNAL_SERVER_ERROR"

    if (err.response) {
        statusCode = err.response.status

        if (statusCode != 500 && err.response.data && err.response.data.error) {
            message = err.response.data.error.message
            code = err.response.data.error.code
        }
    }

    res.status(statusCode)
    res.send({
        error: {
            status: statusCode,
            code: code,
            message: message,
        },
    })
}

module.exports = {
    asyncHandler,
    errorHandler,
}

