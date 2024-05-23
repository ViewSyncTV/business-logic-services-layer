/** @namespace ErrorHandler */

/**
 * Async handler middleware, wraps the controller functions to catch errors and pass them to the error handler
 * @param {Function} fn - The controller function
 * @returns {Function} The wrapped controller function
 * @memberof ErrorHandler
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * Function that handles the error and sends a response to the client in case of error
 * @function
 * @param {Error} err - The error object
 * @param {Types.Request} req - The request object
 * @param {Types.Response} res - The response object
 * @param {Function} next - The next middleware
 * @memberof ErrorHandler
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
