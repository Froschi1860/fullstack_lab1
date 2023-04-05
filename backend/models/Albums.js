const mongoose = require("mongoose")

const AlbumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number
}, { collection: "Albums" })

const Album = mongoose.model("Albums", AlbumSchema)

module.exports = { Album }