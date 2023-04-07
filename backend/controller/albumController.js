const { Album } = require("../models/albumModel")
const { verifyAlbum } = require("../util/verify")

const getAllAlbums = async (req, res) => {
  try {
    let albums = await Album.find()
    if (!albums) return res.status(404).json({ message: "No albums found" })
    return res.json(albums)
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
}

const getAlbumByTitle = async (req, res) => {
  try {
    let albumTitle = req.params.title
    let album = await Album.find({ title: albumTitle })
    if (album.length === 0) return res.status(404).json({ message: `The album titled ${albumTitle} was not found` })
    return res.json(album)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const createAlbum = async (req, res) => {
  const newAlbum = req.body
  if (!verifyAlbum(newAlbum)) return res.sendStatus(400)
  if (await albumExists(newAlbum)) return res.status(409).json({ message: "The album already exists." })
  try {
    let created = await Album.create(newAlbum)
    return res.status(201).json(created)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const albumExists = async album => {
  try {
    let found = await Album.findOne({ title: album.title, artist: album.artist, year: album.year })
    if (found) return true
  } catch (error) {
    console.log(error)
  }
  return false

}


module.exports = { getAllAlbums, getAlbumByTitle, createAlbum }