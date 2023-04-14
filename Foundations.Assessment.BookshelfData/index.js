const bookshelfElement = document.querySelector(".books");
const bookshelf = new Bookshelf(bookshelfElement);
bookshelf.seed(bookData);
bookshelf.render();
// console.log(bookshelf)


const favCount = document.querySelector(".favCount");
const updateBtn = document.querySelector(".favUpdateBtn");

updateBtn.addEventListener("click", () => {
  favCount.textContent = bookshelf.countFavoriteBooks();
});


const searchInput = document.querySelector("nav input");
const searchBtn = document.querySelector(".searchBtn");

//This only searches through the titles of the books!
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const searchFn = (b) => b.title.toLowerCase().includes(query);
  
  bookshelf.filterVisibleBooks(searchFn);
});


const sortBy = document.querySelector(".sortBy");

// This only sorts by the titles of the books!
sortBy.addEventListener("change", () => {
  const query = sortBy.value;
  let sortFn;

  if (query === "titleaz") {
    sortFn = (a, z) => a.title.localeCompare(z.title);
  } else if (query === "titleza") {
    sortFn = (a, z) => z.title.localeCompare(a.title);
  }
 
  bookshelf.sortVisibleBooks(sortFn);
});



let textInput = document.querySelector("#textInput");
textInput.placeholder = "Author (hit Enter)"
let bookArray = [];

// Capture user input and add to array click enter.
textInput.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    // Category pushed to array upon "enter"
    if (bookArray.length < 4 && textInput.value.length > 0) {
      let category = this.value.substring(0, this.value.length);
      bookArray.push(category);
      this.value = "";
      console.log(bookArray);
    }

    // Create a book with one input.
    if (bookArray.length == 1) {
      textInput.placeholder = "Language (hit Enter)"
    }
    else if (bookArray.length == 2) {
      textInput.placeholder = "Subject (hit Enter)"
    }
    else if (bookArray.length == 3) {
      textInput.placeholder = "Title (hit Enter)"
    }
    else if (bookArray.length == 4) {
      textInput.placeholder = "Click to create book!"
    }
  }
  return bookArray;
})

// Turn array into book object and render object upon create button click
let createButton = document.querySelector("#createButton");
let newBook = {};
createButton.addEventListener('click', (newBook) => {
  newBook.author = bookArray[0]
  newBook.language = bookArray[1]
  newBook.subject = bookArray[2]
  newBook.title = bookArray[3]
  // console.log(newBook);
  bookData.push(newBook);

  // Empty bookshelf, re-seed, re-render
  bookshelf.books = [];
  bookshelf.seed(bookData);
  bookshelf.render();

  // Reset for next book add
  bookArray = [];
  arrayCount = 0;
  newBook = {};
  textInput.placeholder = "Author (hit enter)"
})