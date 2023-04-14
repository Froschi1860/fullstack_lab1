const { Album } = require("../models/albumModel")
const { verifyAlbum } = require("../util/verify")

// @desc    Retrieve all albums from database
// @source  GET /api/albums/
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

// @desc    Retrieve one album identified by title from database
// @source  GET /api/albums/:title
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

// @desc    Create a new album in database
// @source  POST /api/albums/
const createAlbum = async (req, res) => {
  const newAlbum = req.body
  if (!verifyAlbum(newAlbum)) return res.sendStatus(400)
  if (await albumExists(newAlbum, false)) return res.status(409).json({ message: "The album already exists." })
  try {
    let created = await Album.create(newAlbum)
    return res.status(201).json(created)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// @desc    Update an existing album in database, identified by _id
// @source  PUT /api/albums/:id
const updateAlbum = async (req, res) => {
  const id = req.params.id
  const updateAlbum = req.body
  if (!await albumExists(id, true)) return res.status(404).json({ message: "The album does not exist." })
  if (!verifyAlbum(updateAlbum)) return res.sendStatus(400)
  try {
    const updated = await Album.findOneAndUpdate({ _id: id }, updateAlbum, { new: true })
    return res.status(200).json(updated)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

// @desc    Remove an existing album from database, identified by _id
// @source  DELETE /api/albums/:id
const deleteAlbum = async (req, res) => {
  const id = req.params.id
  if (!await albumExists(id, true)) return res.status(404).json({ message: "The album does not exist." })
  try {
    const deleted = await Album.findOneAndDelete({ _id: id }, { new: true })
    return res.json(deleted)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const albumExists = async (album, useId) => {
  let searchFilter = { title: album.title, artist: album.artist, year: album.year }
  if (useId) searchFilter = ({ _id: album })
  try {
    let found = await Album.findOne(searchFilter)
    if (found) return true
  } catch (error) {
    console.log(error)
  }
  return false
}


module.exports = { getAllAlbums, getAlbumByTitle, createAlbum, updateAlbum, deleteAlbum }