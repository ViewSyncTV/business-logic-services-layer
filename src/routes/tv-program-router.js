const express = require("express")
const TvProgramController = require("../controllers/tv-program-controller")
const { asyncHandler } = require("../middleware/error_handler")

const router = express.Router()
const tvProgramController = new TvProgramController()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

router.get("/today", asyncHandler(tvProgramController.getTodayPrograms))
router.get("/week", asyncHandler(tvProgramController.getWeekPrograms))

module.exports = router
