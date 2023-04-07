// async (req, res) => {
//   let albums
//   try {
//     albums = await Album.find()
//   } catch (e) {
//     console.log(e)
//     return res.sendStatus(500)
//   }
//   if (albums) {
//     console.log(albums);
//     return res.json(albums)
//   }
//   return res.sendStatus(404)