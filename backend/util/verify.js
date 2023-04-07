const verifyAlbum = album => {
  return album.title && album.artist && album.year
}

module.exports = { verifyAlbum }