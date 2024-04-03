const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

router.get("/", (req, res) => {
    res.send("This is the program metadata API endpoint!")
})

router.get("/movie/:name", programMetadataController.getMovieDetails)
router.get("/tv-show/:name", programMetadataController.getTvShowDetails)

module.exports = router
