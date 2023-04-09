const express = require("express")
const path = require("path")
const dotenv = require("dotenv").config()
const cors = require("cors")
const { connectDb } = require("./backend/config/db")

connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))

// Routing
app.use("/api/albums", require("./backend/routes/albumRoute"))

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/index.html"))
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})
