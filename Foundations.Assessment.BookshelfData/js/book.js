function Book(authors, language, subject, title) {
    this.authors = authors;
    this.language = language;
    this.subject = subject;
    this.title = title;
    this.isFavorite = false;
    this.comments = "";
  
   // Comment ul
    const listOfComments = document.createElement("ul"); 
    listOfComments.style.listStyle = "none"
    listOfComments.textContent = "Comments:"
    listOfComments.style.display = "none"
    listOfComments.style.fontSize = "12px"
    this.render = function () {
      // Define all DOM elements for render
      const bookWrapper = document.createElement("li");
      bookWrapper.classList.add("book-wrapper");
      const entry = document.createElement("li");
      const commentSection = document.createElement("li");
      const title = document.createElement("h2");
      title.textContent = this.title;
      const author = document.createElement("h3");
      author.textContent = this.authors;
      const subject = document.createElement("h4");
      subject.textContent = this.subject;
      const languages = document.createElement("h5");
      languages.textContent = `Language: ${this.language}`;
      const commentButton = document.createElement("button");
      commentButton.textContent = "Comment";
      commentButton.classList.add("comment");
      const commentInput = document.createElement("input");
      commentInput.maxLength = "280"
      const postedComment = document.createElement("li");
      const sendButton = document.createElement("button");
      sendButton.textContent = "Send";
      const favButton = document.createElement("button");
      favButton.textContent = this.isFavorite ? "❤️" : "♡";

        
      // Append all elements to bookWrapper for return
      title.append(favButton);
      listOfComments.append(postedComment);
      entry.append(title, author, subject, languages, listOfComments);
      commentSection.append(commentButton);
      bookWrapper.append(entry, commentSection); 
  

      // Toggle favorite property on click
      favButton.addEventListener("click", () => {
        this.isFavorite = !this.isFavorite;
        favButton.textContent = this.isFavorite ? "❤️" : "♡";
      });
  
      // Add comment input and send button upon comment button click
      commentButton.addEventListener('click', () => {
        commentSection.append(commentInput, sendButton)
      })
  
      // Post comments upon send button click
        sendButton.addEventListener('click', () => {
        listOfComments.style.display = "block"
        this.comments = commentInput.value;
        // Re-append items with new comments
        const postedComment = document.createElement("li");
        postedComment.textContent = this.comments;
        listOfComments.append(postedComment);
        entry.append(title, author, subject, languages, listOfComments);
        bookWrapper.append(entry, commentSection);
        commentInput.value = "";
        commentSection.removeChild(commentInput);
        commentSection.removeChild(sendButton);
  
      })
      // Final return
      return bookWrapper;
    };
  }