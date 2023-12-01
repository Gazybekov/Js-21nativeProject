const API = "http://localhost:8000/books";
let inpName = document.querySelector("#inpName");
let inpAuthor = document.querySelector("#inpAuthor");
let inpImage = document.querySelector("#inpImage");
let inpPrice = document.querySelector("#inpPrice");
let btnAdd = document.querySelector("#btnAdd");
let btnOpenForm = document.querySelector("#flush-collapseOne");
let sectionBooks = document.querySelector("#sectionBooks");
let currentPage = 1;
let countPage = 1;
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");
let inpSearch = document.querySelector("#inpSearch");
let searchValue = "";
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
  const response = await fetch(`${API}?&_page=${currentPage}&_limit=3`);
  const data = await response.json();
  sectionBooks.innerHTML = "";
  console.log(data);
  data.forEach((item) => {
    sectionBooks.innerHTML += `
    <div class="card m-4 cardBook" style="width:  ">
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
        <div>
        <button class="btn btn-outline-danger btnDelete" id="${item.id}" >
        Удалить
        </button>
        <button
      class="btn btn-outline-warning btnEdit"
      id="${item.id}"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Изменить
    </button></div>
        
        
      </div>
    </div>
    `;
  });
  pageFunc();
}

readBooks();

//! ====================Delete======================
document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  if (del_class.includes("btnDelete")) {
    let del_id = e.target.id;
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readBooks());
  }
});

//! ==================EDIT=====================
let editInpName = document.querySelector("#editInpName");
let editInpAuthor = document.querySelector("#editInpAuthor");
let editInpImage = document.querySelector("#editInpImage");
let editInpPrice = document.querySelector("#editInpPrice");
let editBtnSave = document.querySelector("#editBtnSave");
document.addEventListener("click", (e) => {
  let arr = [...e.target.classList];
  if (arr.includes("btnEdit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        editInpName.value = data.bookName;
        editInpAuthor.value = data.bookAuthor;
        editInpImage.value = data.bookImage;
        editInpPrice.value = data.bookPrice;
        editBtnSave.setAttribute("id", data.id);
      });
  }
});

editBtnSave.addEventListener("click", () => {
  let editedBook = {
    bookName: editInpName.value,
    bookAuthor: editInpAuthor.value,
    bookImage: editInpImage.value,
    bookPrice: editInpPrice.value,
  };
  editBook(editedBook, editBtnSave.id);
});
function editBook(editBook, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editBook),
  }).then(() => readBooks());
}

//! ==================PAGINATION==================
function pageFunc() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      countPage = Math.ceil(data.length / 3);
    });
}

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readBooks();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readBooks();
});

//! =================SEARCH====================
