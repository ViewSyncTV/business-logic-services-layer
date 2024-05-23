/**
 * @namespace API
 * @category API
 * @requires express
 */

const express = require("express")

const router = express.Router()

router.all("/", (req, res) => res.send("API endpoint"))
router.use("/tv-program", require("./tv-program-router"))
router.use("/program-metadata", require("./program-metadata-router"))

module.exports = router
