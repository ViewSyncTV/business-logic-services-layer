const axios = require("axios")

const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3030"

const MEDIASET_TV_PROGRAMS_TODAY_GET = `${ADAPTER_SERVICE_URL}/api/tv-program/mediaset/today`

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
    async getTodayPrograms(req, res) {
        try {
            let mediasetPrograms = []
            for (let channel of mediasetChannels) {
                try {
                    const url = `${MEDIASET_TV_PROGRAMS_TODAY_GET}/${channel}`
                    req.log.info(`Calling adapter service: ${url}`)
                    const response = await axios.get(url)

                    if (response.status === 200) {
                        req.log.info("Adapter service response is OK")
                        mediasetPrograms.push(response.data.data)
                    }
                } catch (error) {
                    req.log.error(
                        `Error fetching and parsing programs for channel ${channel}: ${error.message}`,
                    )
                }
            }

            mediasetPrograms.filter((program) => program.length > 0)
            return res.send({ data: mediasetPrograms })
        } catch (error) {
            req.log.error(`Error getting today's programs: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting today's programs" } })
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
