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
