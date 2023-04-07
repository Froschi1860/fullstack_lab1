const express = require("express")

const router = express.Router()

router.route("/")
  .get() // Alll albums
  .post() // Create album

router.route("/:title")

router.route("/:id")
  .put() // Update album
  .delete() // Delete album

module.exports = router