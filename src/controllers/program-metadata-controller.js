const axios = require("axios")
const { MovieNotFoundError, TvShowNotFoundError } = require("../errors/program-metadata-errors")
// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")
// eslint-disable-next-line no-unused-vars
const Controllers = require("./controllers")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3030"

const PROGRAM_METADATA_SERVICE_URL = `${DATA_SERVICE_URL}/api/program-metadata`
const PROGRAM_METADATA_MOVIE_SEARCH_URL = `${PROGRAM_METADATA_SERVICE_URL}/movie/search/{name}`
const PROGRAM_METADATA_TV_SHOW_SEARCH_URL = `${PROGRAM_METADATA_SERVICE_URL}/tv-show/search/{name}`

const PROGRAM_METADATA_MOVIE_DETAILS_URL = `${PROGRAM_METADATA_SERVICE_URL}/movie/{id}`
const PROGRAM_METADATA_TV_SHOW_DETAILS_URL = `${PROGRAM_METADATA_SERVICE_URL}/tv-show/{id}`

const PROGRAM_METADATA_MOVIE_RECOMMENDATIONS_URL = `${PROGRAM_METADATA_SERVICE_URL}/movie/recommendations/{id}`
const PROGRAM_METADATA_TV_SHOW_RECOMMENDATIONS_URL = `${PROGRAM_METADATA_SERVICE_URL}/tv-show/recommendations/{id}`

/**
 * Controller that handles the fetch of the program metadata
 * @memberof Controllers
 */
class ProgramMetadataController {
    constructor() {
        this.getMovieDetails = this.getMovieDetails.bind(this)
        this.getTvShowDetails = this.getTvShowDetails.bind(this)
        this.getTvShowRecommendations = this.getTvShowRecommendations.bind(this)
        this.getMovieRecommendations = this.getMovieRecommendations.bind(this)
    }

    /**
     * Get the details of a movie by its name or a compatible query.
     * The function will call the data service to get a list of possible movies and
     * then get the details of the first one.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Movie>>} The details of the movie
     * @throws Will throw an error if the request fails
     */
    async getMovieDetails(req, res) {
        const movieName = req.params.name
        const movieNameAdapted = encodeURIComponent(movieName)

        const url = PROGRAM_METADATA_MOVIE_SEARCH_URL.replace("{name}", movieNameAdapted)
        req.log.info(`Calling data service: ${url}`)

        const response = await axios.get(url)

        if (response.data?.data?.length > 0) {
            const movie = response.data.data[0]

            // get details of the movie
            const movieDetailsUrl = PROGRAM_METADATA_MOVIE_DETAILS_URL.replace("{id}", movie.id)
            req.log.info(`Calling data service: ${movieDetailsUrl}`)

            const detailsResponse = await axios.get(movieDetailsUrl)

            res.status(200).send({ data: detailsResponse.data.data })
        } else {
            throw new MovieNotFoundError(movieName)
        }
    }

    /**
     * Get the details of a tv-show by its name or a compatible query.
     * The function will call the data service to get a list of possible shows and
     * then get the details of the first one.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TVShow>>} The details of the tv-show
     * @throws Will throw an error if the request fails
     */
    async getTvShowDetails(req, res) {
        const tvShowName = req.params.name
        const tvShowNameAdapted = encodeURIComponent(tvShowName)

        const url = PROGRAM_METADATA_TV_SHOW_SEARCH_URL.replace("{name}", tvShowNameAdapted)
        req.log.info(`Calling data service: ${url}`)

        const response = await axios.get(url)

        // take only the first
        if (response.data?.data?.length > 0) {
            const tvShow = response.data.data[0]

            // get details of the TV show
            const tvShowDetailsUrl = PROGRAM_METADATA_TV_SHOW_DETAILS_URL.replace("{id}", tvShow.id)
            req.log.info(`Calling data service: ${tvShowDetailsUrl}`)

            const detailsResponse = await axios.get(tvShowDetailsUrl)

            res.status(200).send({ data: detailsResponse.data.data })
        } else {
            throw new TvShowNotFoundError(tvShowName)
        }
    }

    /**
     * Get the recommendations of a tv-show by its id.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TVShow[]>>} The recommendations of the tv-show
     * @throws Will throw an error if the request fails
     */
    async getTvShowRecommendations(req, res) {
        const id = req.params.id

        const url = PROGRAM_METADATA_TV_SHOW_RECOMMENDATIONS_URL.replace("{id}", id)
        req.log.info(`Calling data service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Data servire response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Get the recommendations of a movie by its id.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Movie[]>>} The recommendations of the movie
     * @throws Will throw an error if the request fails
     */
    async getMovieRecommendations(req, res) {
        const id = req.params.id

        const url = PROGRAM_METADATA_MOVIE_RECOMMENDATIONS_URL.replace("{id}", id)
        req.log.info(`Calling data service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Data servire response is OK")
        res.send({ data: response.data.data })
    }
}

module.exports = ProgramMetadataController
