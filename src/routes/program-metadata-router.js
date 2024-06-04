/**
 * This nampespace defines the routes for accessing the data from the Movie and TvShow APIs
 * @namespace API.ProgramMetadata
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")
const { asyncHandler } = require("../middleware/error_handler")
// eslint-disable-next-line no-unused-vars
const API = require("./router")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

/**
 * Base route of the Metadata API
 * @name Root
 * @route {GET} /api/program-metadata
 * @memberof API.ProgramMetadata
 */
router.get("/", (req, res) => res.send("This is the program metadata API endpoint!"))

/**
 * Search for movies given a query. <br>
 * This route will return only the best match for the query.
 * @name MovieSearch
 * @route {GET} /api/program-metadata/movie/:name
 * @routeparam {string} :name - The query to search for
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/joker
 *
 * // Example of response
 * {
 *   "data": {
 *     "id":475557,"title":"Joker","original_title":"Joker","description":"Arthur Fleck vive con l'anziana madre in un palazzone fatiscente e sbarca il lunario facendo pubblicità per la strada travestito da clown, in attesa di avere il giusto materiale per realizzare il desiderio di fare il comico. La sua vita, però, è una tragedia: ignorato, calpestato, bullizzato, preso in giro da da chiunque, ha sviluppato un tic nervoso che lo fa ridere a sproposito incontrollabilmente, rendendolo inquietante e allontanando ulteriormente da lui ogni possibile relazione sociale. Ma un giorno Arthur non ce la fa più e reagisce violentemente, pistola alla mano. Mentre la polizia di Gotham City dà la caccia al clown killer, la popolazione lo elegge a eroe metropolitano, simbolo della rivolta degli oppressi contro l'arroganza dei ricchi.","poster_path":"https://image.tmdb.org/t/p/original/y1AthYH1r2j4N4cYn2HdrEGgrnJ.jpg","release_date":"2019-10-01","original_language":"en","genres":["Crime","Thriller","Dramma"],"vote_average":8.2
 *     ...
 *   }
 * }
 */
router.get("/movie/:name", asyncHandler(programMetadataController.getMovieDetails))


/**
 * Search for tv-show given a query. <br>
 * This route will return only the best match for the query.
 * @name TvShowDetails
 * @route {GET} /api/program-metadata/tv-show/:name
 * @routeparam {string} :name - The query to search for
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/friends
 *
 * // Example of response
 * {
 *   "data": {
 *     "id":1668,"title":"Friends","original_title":"Friends","description":"Una delle commedie televisive più amate di sempre su un gruppo di sei amici trentenni, la trama si svolge prevalentemente in due appartamenti e un Coffee-Bar: Monica, Rachel, Phoebe, Chandler, Ross e Joey condividono sogni, amori, delusioni e speranze fra gag esilaranti e battute dal ritmo serratissimo.","poster_path":"https://image.tmdb.org/t/p/original/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg","original_language":"en","first_air_date":"1994-09-22","last_air_date":"2004-05-06","number_of_episodes":228,"number_of_seasons":10,"genres":["Commedia"],"in_production":false,"languages":["en"],"origin_country":["US"],"vote_average":8.44,"seasons":[{"id":4583,"name":"Speciali","overview":"","season_number":0,"episode_count":39,"air_date":"2001-02-14","poster_path":"https://image.tmdb.org/t/p/original/xaEj0Vw0LOmp7kBeX2vmYPb5sTg.jpg"},{"id":4573,"name":"Stagione 1","overview":"","season_number":1,"episode_count":24,"air_date":"1994-09-22","poster_path":"https://image.tmdb.org/t/p/original/mCZhdQYezseNfVJlbFd6hTpeYM0.jpg"},{"id":4574,"name":"Stagione 2","overview":"","season_number":2,"episode_count":24,"air_date":"1995-09-21","poster_path":"https://image.tmdb.org/t/p/original/fJ2U6l6eaTkNtdAPiD1q7IqFEP9.jpg"},{"id":4575,"name":"Stagione 3","overview":"","season_number":3,"episode_count":25,"air_date":"1996-09-16","poster_path":"https://image.tmdb.org/t/p/original/5IWDL5RqRG474G8YeaTp0VSvFrE.jpg"},{"id":4576,"name":"Stagione 4","overview":"","season_number":4,"episode_count":23,"air_date":"1997-09-25","poster_path":"https://image.tmdb.org/t/p/original/74fn3cA3wEVxkgB7Zah37p4ouFz.jpg"},{"id":4577,"name":"Stagione 5","overview":"","season_number":5,"episode_count":23,"air_date":"1998-09-24","poster_path":"https://image.tmdb.org/t/p/original/taRurCMvsEjSO5l56rFkUGuUy4u.jpg"},{"id":4578,"name":"Stagione 6","overview":"","season_number":6,"episode_count":23,"air_date":"1999-09-23","poster_path":"https://image.tmdb.org/t/p/original/b28OVNL0h2LLpHB3DbJUPIad4wg.jpg"},{"id":4579,"name":"Stagione 7","overview":"","season_number":7,"episode_count":23,"air_date":"2000-10-12","poster_path":"https://image.tmdb.org/t/p/original/hEFDi5TjUy46LDpci1MZEhhElNa.jpg"},{"id":4580,"name":"Stagione 8","overview":"","season_number":8,"episode_count":23,"air_date":"2001-09-27","poster_path":"https://image.tmdb.org/t/p/original/rmrvBmFBeW7LZX2s8GeKJ3pRCZf.jpg"},{"id":4581,"name":"Stagione 9","overview":"","season_number":9,"episode_count":23,"air_date":"2002-09-26","poster_path":"https://image.tmdb.org/t/p/original/6HVaEV3gl1RQPwYIvzl9Rm0yvLm.jpg"},{"id":4582,"name":"Stagione 10","overview":"","season_number":10,"episode_count":17,"air_date":"2003-09-25","poster_path":"https://image.tmdb.org/t/p/original/jqKRRnpt7MaTDs6NLxHzT3H3Ct4.jpg"}]
 *     ...
 *   }
 * }
 */
router.get("/tv-show/:name", asyncHandler(programMetadataController.getTvShowDetails))

module.exports = router
