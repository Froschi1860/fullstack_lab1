const express = require("express")
const dotenv = require("dotenv").config()
const { connectDb } = require("./backend/config/db")
const { Album } = require("./backend/models/Albums")

connectDb()
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})

app.get("/", async (req, res) => {
  let albums
  try {
    albums = await Album.find()
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
  if (albums) {
    console.log(albums);
    return res.json(albums)
  }
  return res.sendStatus(404)
})

app.get("/create", async (req, res) => {
  let newAlbum = new Album({ title: "Days of the Lost", artist: "The Halo Effect", year: 2022 })
  try {
    newAlbum.save()
  } catch (e) {
    console.log(e);
    return res.sendStatus(400)
  }
  res.sendStatus(201)
})

