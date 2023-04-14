const port = 3000
let updateId

function start() {
  updateAlbumTable()
  enableRefreshBtn()
  enableAddBtn()
  enableCreateBtn()
}

async function fetchAllAlbums() {
  return await (await fetch(`http://localhost:${port}/api/albums`)).json()
}

async function createAlbum() {
  let newAlbum = buildAlbumJson()
  let created = await fetch(`http://localhost:${port}/api/albums/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newAlbum)
  })
  closeUpdateModal()
  clearUpdateModal()
  updateAlbumTable()
  if (created.status === 409) return window.alert("The album already exists.")
  if (created.status === 201) return window.alert("Successfully created.")
  return window.alert("An error occured when saving to database.")
}

async function updateAlbum() {

}

async function deleteAlbum(id) {
  let deleted = await fetch(`http://localhost:${port}/api/albums/${id}`, {
    method: "DELETE"
  })
  if (deleted.status === 404) return window.alert("The album does not exist.")
  if (created.status === 200) return window.alert("Successfully deleted.")
  return window.alert("An error occured when deleting from database.")
}

async function updateAlbumTable() {
  let tbl = document.getElementById("album-data")
  tbl.innerHTML = "<tr><td>Loading</td></tr>"
  let albums = await fetchAllAlbums()
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

function clearUpdateModal() {
  document.getElementById("title").value = ""
  document.getElementById("artist").value = ""
  document.getElementById("year").value = ""
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