/** @namespace Logger */

// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")

const pino = require("pino")

const logger = pino({
    level: "info",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
})

/**
 * The middleware that handles the logging of the requests and injects the logger into the request object
 * @function
 * @param {Types.Request} req - The request object
 * @param {Types.Response} res - The response object
 * @param {Function} next - The next middleware
 * @memberof Logger
 */
const pinoMiddleware = (req, res, next) => {
    const method = req.method
    const url = req.url

    const reqLogger = logger.child({})
    req.log = reqLogger

    req.log.info(`Request: ${method} ${url}`)

    reqLogger.flush()
    next()
}

module.exports = pinoMiddleware
