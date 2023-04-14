function Bookshelf(htmlElement, books = []) {
  this.books = books;
  this.htmlElement = htmlElement;
  this.visibleBooks = books;


  this.addBook = function (book) {
    this.books.push(book);
  };


  this.seed = function (data) {
    // Load in the data
    data.forEach((bookInfo) => {
      const book = new Book(
        bookInfo.author,
        bookInfo.language,
        bookInfo.subject,
        bookInfo.title
      );
      this.addBook(book);
    });

    // Prepare and sort visible books
    this.visibleBooks = this.books;
    this.sortVisibleBooks((a, b) => a.title.localeCompare(b.title));

    this.render();
  };

  this.render = function () {
    const ul = document.createElement("ul");
    const books = this.visibleBooks.map((b) => b.render());
    // Spread operator expands an array into its iterable elements
    ul.replaceChildren(...books);
    this.htmlElement.replaceChildren(ul);
  };

  this.countFavoriteBooks = function () {
    return this.books.reduce(
      (count, book) => (book.isFavorite ? count + 1 : count),
      0
    );
  };

  this.filterVisibleBooks = function (criteria) {
    this.visibleBooks = this.books.filter(criteria);
    this.render();
  };


  this.sortVisibleBooks = function (compareFn) {
    // CompareFn is a variable parameter.
    this.visibleBooks.sort(compareFn);
    this.render();
  };

    
}
