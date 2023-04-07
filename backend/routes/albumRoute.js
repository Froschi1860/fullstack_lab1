const express = require("express")
const { getAllAlbums, getAlbumByTitle, createAlbum } = require("../controller/AlbumController")

const router = express.Router()

router.route("/")
  .get(getAllAlbums)
  .post(createAlbum)

router.route("/:title")
  .get(getAlbumByTitle)

router.route("/:id")
  .put() // Update album
  .delete() // Delete album

module.exports = router