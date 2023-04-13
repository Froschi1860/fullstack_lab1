const port = 3000
let updateId

function start() {
  updateAlbumTable()
  enableRefreshBtn()
  enableAddBtn()
  enableCreateBtn()
}

async function fetchAllAlbums() {
  let albums = await (await fetch(`http://localhost:${port}/api/albums`)).json()
  console.log(albums)
  return albums
}

async function createAlbum(album) {
  let newAlbum = buildAlbumJson()
  console.log(newAlbum)
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
  tbl.innerHTML = "<tr><td>Loading</td></tr>"
  if (albums.length === 0) return tbl.innerHTML = "<tr><td>No data saved</td></tr>"
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

function buildAlbumJson() {
  let titleField = document.getElementById("title")
  let artistField = document.getElementById("artist")
  let yearField = document.getElementById("year")
  return {
    title: titleField.value,
    artist: artistField.value,
    year: Number.parseInt(yearField.value)
  }
}

function enableUpdateBtns() {
  let btns = document.querySelectorAll(".update-btn")
  btns.forEach(btn => {
    btn.addEventListener("click", e => {
      updateId = btn.getAttribute("album-id")
      document.getElementById("updateAlbum").style.display = "inline-block"
      showUpdateModal()
    })
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
  let addBtn = document.getElementById("newAlbum")
  addBtn.addEventListener("click", e => {
    showUpdateModal()
    document.getElementById("createAlbum").style.display = "inline-block"
  })
}

function enableCreateBtn() {
  document.getElementById("createAlbum").addEventListener("click", e => createAlbum())
}

function enableRefreshBtn() {
  document.querySelector("#refresh").addEventListener("click", async (event) => {
    await updateAlbumTable()
  })
}

function showUpdateModal() {
  document.getElementById("updateModal").style.display = "block"
  document.getElementById("modalClose").addEventListener("click", (e) => closeUpdateModal())
}

function closeUpdateModal() {
  document.getElementById("updateModal").style.display = "none"
  document.getElementById("updateAlbum").style.display = "none"
  document.getElementById("createAlbum").style.display = "none"
}

window.onclick = (e) => e.target == document.getElementById("updateModal") && closeUpdateModal()

start()