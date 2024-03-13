const axios = require("axios")

const BUSINESS_LOGIC_SERVICE_URL = process.env.BUSINESS_LOGIC_SERVICE_URL || "http://localhost:3040"
const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3030"

const MEDIASET_TV_PROGRAM_CONTROLLER_URL = `${BUSINESS_LOGIC_SERVICE_URL}/api/tv-program/mediaset`
const MEDIASET_TODAY_PROGRAMS_GET = `${MEDIASET_TV_PROGRAM_CONTROLLER_URL}/today`
const MEDIASET_TV_PROGRAMS_ADAPTER_POST = `${ADAPTER_SERVICE_URL}/api/tv-program/mediaset`

// const MILLISECONDS_IN_ONE_DAY = 86400000
// const GET_LAST_UPDATE_URL = `${ADAPTER_SERVICE_URL}/api/db/tv-programs/get-last-update`

const mediasetChannels = [
    "C5", // Canale5
    "I1", // Italia1
    "R4", // Rete4
    "LB", // 20
    "KI", // Iris
    "TS", // 27
    "KA", // La5
    "B6", // Cine34
    "FU", // Focus
    "LT", // TopCrime
    "I2", // Italia2
    "KF", // Tgcom24
    "KQ", // MediasetExtra
    "KB", // Boing
    "LA", // Cartoonito
]

class TvProgramController {
    constructor() {
        this.getTodayPrograms = this.getTodayPrograms.bind(this)
    }

    async getTodayPrograms(req, res) {
        try {
            let mediasetPrograms = []
            for (let channel of mediasetChannels) {
                try {
                    const data = await this.#fetchAndParsePrograms(req.log, channel)
                    mediasetPrograms.push(data)
                } catch (error) {
                    req.log.error(
                        `Error fetching and parsing programs for channel ${channel}: ${error.message}`,
                    )
                }
            }

            mediasetPrograms.filter((program) => program.length > 0)
            return res.send(mediasetPrograms)
        } catch (error) {
            req.log.error(`Error getting today's programs: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting today's programs" } })
        }
    }

    async #fetchAndParsePrograms(logger, channel) {
        try {
            const response = await axios.get(`${MEDIASET_TODAY_PROGRAMS_GET}/${channel}`)

            if (response.status === 200) {
                const adapterResponse = await axios.post(
                    MEDIASET_TV_PROGRAMS_ADAPTER_POST,
                    response.data,
                )

                if (adapterResponse.status === 200) {
                    return adapterResponse.data
                }
            }

            throw new Error("Error calling the adapter")
        } catch (error) {
            logger.error(
                `Error fetching and parsing programs for channel ${channel}: ${error.message}`,
            )
            throw new Error("Error fetching and parsing programs")
        }
    }

    // async getDateSinceLastUpdate() {
    //     try {
    //         const lastUpdateResponse = await axios.get(GET_LAST_UPDATE_URL)

    //         if ("error" in lastUpdateResponse) {
    //             throw new Error("Internal server error")
    //         }

    //         let lastUpdateDate = new Date(lastUpdateResponse.data.lastUpdate)
    //         let days_since_last_update =
    //             (new Date().getTime() - lastUpdateDate) / MILLISECONDS_IN_ONE_DAY

    //         return days_since_last_update
    //     } catch (error) {
    //         throw new Error("Internal server error")
    //     }
    // }

    // async getAllPrograms(req, res) {
    //     try {
    //         let days_since_last_update = await this.getDateSinceLastUpdate()

    //         if (days_since_last_update > 1) {
    //             // update the database with new data
    //         }

    //         // fetch the programs from the database

    //         return ""
    //     } catch (error) {
    //         req.log.error("Error fetching programs from external service:", error)
    //         res.status(500).json({ error: "Internal server error" })
    //     }
    // }
}

module.exports = TvProgramController
