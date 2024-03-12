const axios = require("axios")

const BUSINESS_LOGIC_SERVICE_URL = process.env.BUSINESS_LOGIC_SERVICE_URL || "http://localhost:3040"
const MEDIASET_TV_PROGRAM_CONTROLLER_URL = `${BUSINESS_LOGIC_SERVICE_URL}/api/tv-program/mediaset`
const MEDIASET_TODAY_PROGRAMS_GET = `${MEDIASET_TV_PROGRAM_CONTROLLER_URL}/today`

// const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3030"
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
        // TODO: for now only mediaset works
        try {
            var mediasetPrograms = []
            for (let channel of mediasetChannels) {
                let url = `${MEDIASET_TODAY_PROGRAMS_GET}/${channel}`
                let response = await axios.get(url)

                if (response.status === 200) {
                    let channelPrograms = []

                    for (let entry of response.data.entries) {
                        for (let listing of entry.listings) {
                            channelPrograms.push({
                                name: listing.mediasetlisting$epgTitle,
                                description: listing.description,
                                channel: channel,
                                start_time: listing.startTime,
                                end_time: listing.endTime,
                            })
                        }
                    }

                    mediasetPrograms.push(channelPrograms)
                }
            }

            return res.send(mediasetPrograms)
        } catch (error) {
            req.log.error(`Error getting today's programs: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting today's programs" } })
        }
    }

    async getAllPrograms(req, res) {}

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
