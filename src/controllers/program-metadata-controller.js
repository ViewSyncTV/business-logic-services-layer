const axios = require("axios")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3030"

const PROGRAM_METADATA_SERVICE_URL = `${DATA_SERVICE_URL}/api/program-metadata`
const PROGRAM_METADATA_MOVIE_SEARCH_URL = `${PROGRAM_METADATA_SERVICE_URL}/movie/search/{name}`
const PROGRAM_METADATA_TV_SHOW_SEARCH_URL = `${PROGRAM_METADATA_SERVICE_URL}/tv-show/search/{name}`

const PROGRAM_METADATA_MOVIE_DETAILS_URL = `${PROGRAM_METADATA_SERVICE_URL}/movie/{id}`
const PROGRAM_METADATA_TV_SHOW_DETAILS_URL = `${PROGRAM_METADATA_SERVICE_URL}/tv-show/{id}`

class ProgramMetadataController {
    constructor() {
        this.getMovieDetails = this.getMovieDetails.bind(this)
        this.getTvShowDetails = this.getTvShowDetails.bind(this)
    }

    async getMovieDetails(req, res) {
        try {
            const movieName = req.params.name
            const movieNameAdapted = encodeURIComponent(movieName)

            const url = PROGRAM_METADATA_MOVIE_SEARCH_URL.replace("{name}", movieNameAdapted)
            req.log.info(`Calling data service: ${url}`)

            const response = await axios.get(url)

            if (response.status === 200 && response.data.data) {
                // take only the first
                if (response.data.data.length > 0) {
                    const movie = response.data.data[0]

                    // get details of the movie
                    const movieDetailsUrl = PROGRAM_METADATA_MOVIE_DETAILS_URL.replace(
                        "{id}",
                        movie.id,
                    )
                    req.log.info(`Calling data service: ${movieDetailsUrl}`)

                    const detailsResponse = await axios.get(movieDetailsUrl)

                    if (detailsResponse.status === 200 && response.data.data) {
                        res.status(200).send(detailsResponse.data.data)
                    } else {
                        throw new Error(detailsResponse.data.error)
                    }
                } else {
                    res.status(404).send({ error: { message: `Movie not found: ${movieName}` } })
                }
            } else {
                throw new Error(response.data.error)
            }
        } catch (error) {
            req.log.error(`Error fetching movie details: ${error.message}`)
            res.status(500).send({ error: { message: error.message } })
        }
    }

    async getTvShowDetails(req, res) {
        try {
            const tvShowName = req.params.name
            const tvShowNameAdapted = encodeURIComponent(tvShowName)

            const url = PROGRAM_METADATA_TV_SHOW_SEARCH_URL.replace("{name}", tvShowNameAdapted)
            req.log.info(`Calling data service: ${url}`)

            const response = await axios.get(url)

            if (response.status === 200 && response.data.data) {
                // take only the first
                if (response.data.data.length > 0) {
                    const tvShow = response.data.data[0]

                    // get details of the TV show
                    const tvShowDetailsUrl = PROGRAM_METADATA_TV_SHOW_DETAILS_URL.replace(
                        "{id}",
                        tvShow.id,
                    )
                    req.log.info(`Calling data service: ${tvShowDetailsUrl}`)

                    const detailsResponse = await axios.get(tvShowDetailsUrl)

                    if (detailsResponse.status === 200 && response.data.data) {
                        res.status(200).send(detailsResponse.data.data)
                    } else {
                        throw new Error(detailsResponse.data.error)
                    }
                } else {
                    res.status(404).send({ error: { message: `TV show not found: ${tvShowName}` } })
                }
            } else {
                throw new Error(response.data.error)
            }
        } catch (error) {
            req.log.error(`Error fetching TV show details: ${error.message}`)
            res.status(500).send({ error: { message: error.message } })
        }
    }
}

module.exports = ProgramMetadataController
