/**
 * This nampespace defines the routes for accessing the data from the Mediaset API and Rai API
 * @namespace API.TvProgram
 * @category API
 * @subcategory External Resources
 * @requires express
 */

// eslint-disable-next-line no-unused-vars
const API = require("./router")

const express = require("express")
const TvProgramController = require("../controllers/tv-program-controller")
const { asyncHandler } = require("../middleware/error_handler")

const router = express.Router()
const tvProgramController = new TvProgramController()

/**
 * Base route of the TV Programs API
 * @name Root
 * @route {GET} /api/tv-program
 * @memberof API.TvProgram
 */
router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

/**
 * Get the list of Tv programs for today for both Mediaset and Rai.
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/today/
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/today
 *
 * // Example of response
 * {
 *  "data": [
 *    {"title":"Porta a Porta - Puntata del 28/05/2024","description":"Programma di informazione e approfondimento di Bruno Vespa dedicato all'attualità politica, alla cronaca e al costume.... - Un programma di Bruno Vespa Con la collaborazione di Antonella Martinelli, Maurizio Ricci, Giuseppe Tortora, Paola Miletich, Vito Sidoti, Concita Borrelli E di Vladimiro Polchi Produttore esecutivo Rossella Lucchi Regia di Sabrina Busiello","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:30:00.000Z","end_time":"2024-05-28T21:55:00.000Z"},
 *    {"title":"TG1 Sera","description":"","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:55:00.000Z","end_time":"2024-05-28T22:00:00.000Z"}
 *    ...
 *   ]
 * }
 */
router.get("/today", asyncHandler(tvProgramController.getTodayPrograms))

/**
 * Get the list of Tv programs for the week for both Mediaset and Rai.
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/week/
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/week
 *
 * // Example of response
 * {
 *  "data": [
 *    {"title":"Porta a Porta - Puntata del 28/05/2024","description":"Programma di informazione e approfondimento di Bruno Vespa dedicato all'attualità politica, alla cronaca e al costume.... - Un programma di Bruno Vespa Con la collaborazione di Antonella Martinelli, Maurizio Ricci, Giuseppe Tortora, Paola Miletich, Vito Sidoti, Concita Borrelli E di Vladimiro Polchi Produttore esecutivo Rossella Lucchi Regia di Sabrina Busiello","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:30:00.000Z","end_time":"2024-05-28T21:55:00.000Z"},
 *    {"title":"TG1 Sera","description":"","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:55:00.000Z","end_time":"2024-05-28T22:00:00.000Z"}
 *    ...
 *   ]
 * }
 */
router.get("/week", asyncHandler(tvProgramController.getWeekPrograms))

module.exports = router
