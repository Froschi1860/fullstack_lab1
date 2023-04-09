const port = 3000

async function fetchAllAlbums() {
  let albums = await fetch(`http://localhost:${port}/api/albums`)
  console.log(await albums.json())
}

// document.getElementById("album-data").innerHTML = 
fetchAllAlbums()