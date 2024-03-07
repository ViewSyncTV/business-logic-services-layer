const axios = require("axios")

const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3030"
const MILLISECONDS_IN_DAY = 86400000

const GET_LAST_UPDATE_URL = `${ADAPTER_SERVICE_URL}/api/db/tv-programs/get-last-update`

class TvProgramController {
    async getDateSinceLastUpdate() {
        try {
            const lastUpdateResponse = await axios.get(GET_LAST_UPDATE_URL)

            if ("error" in lastUpdateResponse) {
                throw new Error("Internal server error")
            }

            let lastUpdateDate = new Date(lastUpdateResponse.data.lastUpdate)
            let days_since_last_update =
                (new Date().getTime() - lastUpdateDate) / MILLISECONDS_IN_DAY

            return days_since_last_update
        } catch (error) {
            throw new Error("Internal server error")
        }
    }

    async getAllPrograms(req, res) {
        try {
            let days_since_last_update = await this.getDateSinceLastUpdate()

            if (days_since_last_update > 1) {
                // update the database with new data
            }

            // fetch the programs from the database


            return ""
        } catch (error) {
            req.log.error("Error fetching programs from external service:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}

module.exports = TvProgramController
