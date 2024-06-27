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

/**
 * Add a Tv program to the favorite list of the user.
 * @name FavoriteAdd
 * @route {POST} /api/tv-program/favorite
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * POST /api/tv-program/favorite
 * {
 *     "user_email": "test@email.com",
 *     "movie_id": "12345",  // or tvshow_id
 *     "title": "Title"
 * }
 */
router.post("/favorite", asyncHandler(tvProgramController.addFavorite))

/**
 * Remove a Tv program from the favorite list of the user.
 * @name FavoriteRemove
 * @route {DELETE} /api/tv-program/favorite
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * DELETE /api/tv-program/favorite
 * {
 *    "user_email": "test@email.com",
 *    "tvshow_id": "12345"  // or movie_id
 * }
 */
router.delete("/favorite", asyncHandler(tvProgramController.removeFavorite))

/**
 * Get the list of favorite Tv programs of the user.
 * @name FavoriteGet
 * @route {GET} /api/tv-program/favorites
 * @routeparam {string} :userMail - The email of the user
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/favorites/test%40mail.com%0A
 *
 * // Example of response
 * {
 *     "data": [
 *          {"movie_id": 8384, "title": "title1"}
 *          {"tvshow_id": 88829, "title": "title2"},
 *     ]
 * }
 */
router.get("/favorites/:userMail", asyncHandler(tvProgramController.getFavorites))

/**
 * Add a Tv program to the reminder list of the user.
 * @name ReminderAdd
 * @route {POST} /api/tv-program/reminder
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * POST /api/tv-program/reminder
 * {
 *     "user_email": "test@email.com",
 *     "tvprogram_id": "12345"
 * }
 */
router.post("/reminder", asyncHandler(tvProgramController.addReminder))

/**
 * Remove a Tv program from the reminder list of the user.
 * @name ReminderRemove
 * @route {DELETE} /api/tv-program/reminder
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * DELETE /api/tv-program/reminder
 * {
 *    "user_email": "test@email.com",
 *    "tvprogram_id": "12345"
 * }
 */
router.delete("/reminder", asyncHandler(tvProgramController.removeReminder))

/**
 * Get the list of reminder Tv programs of the user.
 * @name ReminderGet
 * @route {GET} /api/tv-program/reminders
 * @routeparam {string} :userMail - The email of the user
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/reminders/test%40mail.com%0A
 *
 * // Example of response
 * {
 *     "data": [
 *          {"tvprogram_id": 8384},
 *          {"tvprogram_id": 88829}
 *     ]
 * }
 */
router.get("/reminders/:userMail", asyncHandler(tvProgramController.getReminders))

module.exports = router
