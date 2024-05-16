const axios = require("axios")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3030"

const MEDIASET_TV_PROGRAMS_WEEK_GET = `${DATA_SERVICE_URL}/api/tv-program/mediaset/week`
const RAI_TV_PROGRAMS_WEEK_GET = `${DATA_SERVICE_URL}/api/tv-program/rai/week`
const GET_LAST_UPDATE_URL = `${DATA_SERVICE_URL}/api/db/tv-program/get-last-update`
const TV_PROGRAM_INSERT_URL = `${DATA_SERVICE_URL}/api/db/tv-program/insert`

const DB_TV_PROGRAM_TODAY_GET_URL = `${DATA_SERVICE_URL}/api/db/tv-program/today`
const DB_TV_PROGRAM_WEEK_GET_URL = `${DATA_SERVICE_URL}/api/db/tv-program/week`
const DB_TV_PROGRAM_RAI_CHANNEL_LIST_GET = `${DATA_SERVICE_URL}/api/db/tv-program/rai-channel-list`
const DB_TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET = `${DATA_SERVICE_URL}/api/db/tv-program/mediaset-channel-list`

const MILLISECONDS_IN_ONE_DAY = 86400000

class TvProgramController {
    constructor() {
        this.getTodayPrograms = this.getTodayPrograms.bind(this)
        this.getWeekPrograms = this.getWeekPrograms.bind(this)
    }

    async getTodayPrograms(req, res) {
        await this.#checkEndUpdateDB(req.log)

        req.log.info(`Calling data service: ${DB_TV_PROGRAM_TODAY_GET_URL}`)
        const dbResponse = await axios.get(DB_TV_PROGRAM_TODAY_GET_URL)

        req.log.info("Data service response is OK")
        res.send({ data: dbResponse.data.data })
    }

    async getWeekPrograms(req, res) {
        await this.#checkEndUpdateDB(req.log)

        req.log.info(`Calling data service: ${DB_TV_PROGRAM_WEEK_GET_URL}`)
        const dbResponse = await axios.get(DB_TV_PROGRAM_WEEK_GET_URL)

        req.log.info("Data service response is OK")
        res.send({ data: dbResponse.data.data })
    }

    async #checkEndUpdateDB(logger) {
        if (await this.#isDbUpdateNeeded(logger)) {
            logger.info("DB update is needed")

            const mediasetPrograms = await this.#getMediasetPrograms(logger)
            const raiPrograms = await this.#getRaiPrograms(logger)
            const allPrograms = mediasetPrograms.concat(raiPrograms)

            // save the data on the db
            logger.info(`Calling data service: ${TV_PROGRAM_INSERT_URL}`)
            const insertResponse = await axios.post(TV_PROGRAM_INSERT_URL, {
                data: allPrograms,
            })

            if (insertResponse.status === 200) {
                logger.info("Data service response is OK")
            } else {
                logger.error("Error saving programs to the DB")
                throw new Error("Error saving programs to the DB")
            }
        }
    }

    async #getMediasetPrograms(logger) {
        let mediasetPrograms = []
        let mediasetChannels = []

        // get the list of mediaset channels from the database
        logger.info(`Calling data service: ${DB_TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET}`)
        await axios
            .get(DB_TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET)
            .then((response) => {
                mediasetChannels = response.data.data.map((channel) => channel.id)
            })
            .catch((error) => {
                logger.error(`Error fetching mediaset channels: ${error.message}`)
            })

        for (let channel of mediasetChannels) {
            try {
                const url = `${MEDIASET_TV_PROGRAMS_WEEK_GET}/${channel}`
                logger.info(`Calling data service: ${url}`)
                const response = await axios.get(url)

                if (response.status === 200) {
                    logger.info("Data service response is OK")
                    mediasetPrograms.push(...response.data.data)
                }
            } catch (error) {
                logger.error(
                    `Error fetching and parsing programs for channel ${channel}: ${error.message}`,
                )
            }
        }

        mediasetPrograms.filter((program) => program.length > 0)
        return mediasetPrograms
    }

    async #getRaiPrograms(logger) {
        let raiPrograms = []
        let raiChannels = []

        //getthelist of rai channels from the database
        logger.info(`Calling data service: ${DB_TV_PROGRAM_RAI_CHANNEL_LIST_GET}`)
        await axios
            .get(DB_TV_PROGRAM_RAI_CHANNEL_LIST_GET)
            .then((response) => {
                raiChannels = response.data.data.map((channel) => channel.id)
            })
            .catch((error) => {
                logger.error(`Error fetching mediaset channels: ${error.message}`)
            })

        for (let channel of raiChannels) {
            try {
                const url = `${RAI_TV_PROGRAMS_WEEK_GET}/${channel}`
                logger.info(`Calling data service: ${url}`)
                const response = await axios.get(url)

                if (response.status === 200) {
                    logger.info("Data service response is OK")
                    raiPrograms.push(...response.data.data)
                }
            } catch (error) {
                logger.error(
                    `Error fetching and parsing programs for channel ${channel}: ${error.message}`,
                )
            }
        }

        raiPrograms.filter((program) => program.length > 0)
        return raiPrograms
    }

    async #isDbUpdateNeeded(logger) {
        try {
            let days_since_last_update = await this.#getDaysSinceLastUpdate(logger)

            // check if days_since_last_update is is Nan
            if (isNaN(days_since_last_update)) {
                logger.error("Data service response is not a number")
                return true
            }

            logger.info(`Days since last update: ${days_since_last_update}`)
            return days_since_last_update > 1
        } catch (error) {
            logger.error("Error checking if DB update is needed:", error)
            return true
        }
    }

    async #getDaysSinceLastUpdate(logger) {
        try {
            logger.info(`Calling data service:  ${GET_LAST_UPDATE_URL}`)
            const lastUpdateResponse = await axios.get(GET_LAST_UPDATE_URL)

            if ("error" in lastUpdateResponse) {
                throw new Error("Internal server error")
            }

            if (lastUpdateResponse.data.data === null) {
                logger.error("Empty response from data service")
                throw new Error("Empty response from the data service")
            }

            logger.info("Data service response is OK")
            let lastUpdateDate = new Date(lastUpdateResponse.data.data)
            let days_since_last_update =
                (new Date().getTime() - lastUpdateDate) / MILLISECONDS_IN_ONE_DAY

            return days_since_last_update
        } catch (error) {
            logger.error("Error fetching last update date:", error)
            throw new Error("Internal server error")
        }
    }
}

module.exports = TvProgramController
