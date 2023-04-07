const express = require("express")
const { getAllAlbums, getAlbumByTitle, createAlbum, updateAlbum, deleteAlbum } = require("../controller/AlbumController")


const router = express.Router()

router.route("/")
  .get(getAllAlbums)
  .post(createAlbum)

router.route("/:title")
  .get(getAlbumByTitle)

router.route("/:id")
  .put(updateAlbum)
  .delete(deleteAlbum)

module.exports = router