const API = "http://localhost:8000/books";
let inpName = document.querySelector("#inpName");
let inpAuthor = document.querySelector("#inpAuthor");
let inpImage = document.querySelector("#inpImage");
let inpPrice = document.querySelector("#inpPrice");
let btnAdd = document.querySelector("#btnAdd");
let btnOpenForm = document.querySelector("#flush-collapseOne");
let sectionBooks = document.querySelector("#sectionBooks");
btnAdd.addEventListener("click", () => {
  if (
    !inpName.value.trim() ||
    !inpAuthor.value.trim() ||
    !inpImage.value.trim() ||
    !inpPrice.value.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }
  let newBook = {
    bookName: inpName.value,
    bookAuthor: inpAuthor.value,
    bookImage: inpImage.value,
    bookPrice: inpPrice.value,
  };
  createBooks(newBook);
  readBooks();
});

//! ================CREATE====================
function createBooks(book) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(book),
  });
  inpName.value = "";
  inpAuthor.value = "";
  inpImage.value = "";
  inpPrice.value = "";
  btnOpenForm.classList.toggle("show");
}
//! =====================READ=======================
async function readBooks() {
  const response = await fetch(API);
  const data = await response.json();
  sectionBooks.innerHTML = "";
  data.forEach((item) => {
    sectionBooks.innerHTML += `
    <div class="card m-4 cardBook" style="width: 18rem">
      <img
        id="${item.id}"
        src="${item.bookImage}"
        alt=""
        class="card-img-top detailsCard"
        style="height: 280px"
      />
      <div class="card-body">
        <h5 class="card-title">${item.bookName}</h5>
        <p class="card-text">${item.bookAuthor}</p>
        <span class="card-text">${item.bookPrice}</span>
      </div>
    </div>
    `;
  });
}

readBooks();
