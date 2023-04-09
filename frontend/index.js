const port = 3000

function start() {
  updateAlbumTable()
  enableRefreshBtn()
  enableAddBtn()
}

async function fetchAllAlbums() {
  let albums = await (await fetch(`http://localhost:${port}/api/albums`)).json()
  console.log(albums)
  return albums
}

async function deleteAlbum(id) {
  console.log(`http://localhost:${port}/api/albums/${id}`)
  let deleted = await fetch(`http://localhost:${port}/api/albums/${id}`, {
    method: "DELETE"
  })
  return deleted
}

async function updateAlbumTable() {
  let albums = await fetchAllAlbums()
  let tbl = document.getElementById("album-data")
  if (albums.length === 0) return tbl.innerHTML = "<tr><td>No data</td></tr>"
  tbl.innerHTML = ''
  albums.forEach(album => {
    tbl.innerHTML +=
      `
      <tr>
        <td class="title">${album.title}</td>
        <td class="artist">${album.artist}</td>
        <td>${album.year}</td>
        <td><button class="update-btn" album-id=${album._id}>Edit</button></td>
        <td><button class="delete-btn" album-id=${album._id}>Delete</button></td>
      </tr>
      `})
  enableDeleteBtns()
  enableUpdateBtns()
}

function enableUpdateBtns() {
  let btns = document.querySelectorAll(".update-btn")
  btns.forEach(btn => {

  })
}

function enableDeleteBtns() {
  let btns = document.querySelectorAll(".delete-btn")
  btns.forEach(btn => {
    btn.addEventListener("click", async (event) => {
      let deleted = await deleteAlbum(btn.getAttribute("album-id"))
      await updateAlbumTable()
    })
  })
}

function enableAddBtn() {

}

function enableRefreshBtn() {
  document.querySelector("#refresh").addEventListener("click", async (event) => {
    await updateAlbumTable()
  })
}

start()