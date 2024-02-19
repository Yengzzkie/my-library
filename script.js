let myLibrary = [
    { id: 1, title: "Hobbit", author: "JK Rowling", pages: "185", isRead: "Read" }
  ];
  
  // Object constructor
  function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  // opens the input modal
  const modal = document.querySelector(".modal");
  const addBookBtn = document
    .querySelector(".add-book-btn")
    .addEventListener("click", () => {
      modal.showModal();
  
      const closeModalBtn = document
        .querySelector(".close-modal")
        .addEventListener("click", () => {
          modal.close();
        });
    });
  
  // Main function to add the book to the array
  const submitBtn = document
    .getElementById("submitButton")
    .addEventListener("click", (event) => {
      event.preventDefault();
  
      const inputTitle = document.getElementById("title").value;
      const inputAuthor = document.getElementById("author").value;
      const inputPages = document.getElementById("pages").value;
      const inputRead = document.getElementById("isRead").checked;
  
      const newBook = new Book(
        inputTitle,
        inputAuthor,
        inputPages,
        inputRead ? "Read" : "Not read"
      );
  
      myLibrary.push(newBook);
      console.log(myLibrary);
      renderLibrary();
  
      //Clears the input field upon submission and close the modal
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("pages").value = "";
      modal.close();
    });
  
  // renders the book object to the DOM
  function renderLibrary() {
    const objContainer = document.querySelector(".objContainer");
  
    objContainer.innerHTML = "";
  
    myLibrary.forEach((book, index) => {
      const bookObj = document.createElement("div");
      const p = document.createElement("p");
      const deleteBtn = document.createElement("button");
  
      bookObj.classList.add("book");
      p.style.whiteSpace = "pre-line";
      p.textContent = `ID: ${index + 1} \nTitle: ${book.title}\nAuthor: ${
        book.author
      } \nPages: ${book.pages} \nStatus: ${book.isRead}`;
      deleteBtn.classList.add("delete-book");
      deleteBtn.textContent = "X";

      deleteBtn.addEventListener("click", () => { 
        removeBookFromLibrary(index);
      });
  
      bookObj.appendChild(p);
      bookObj.appendChild(deleteBtn);
      objContainer.appendChild(bookObj);
      console.log(myLibrary);
    });
  }
  
  // remove book from array
const bookModal = document.querySelector('.book-modal');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');

confirmBtn.addEventListener('click', () => {
    if (currentIndexToDelete !== null) {
        const confirmDialog = document.querySelector('.confirmation-dialog');
        const deletedBookTitle = myLibrary[currentIndexToDelete].title;

        myLibrary.splice(currentIndexToDelete, 1);
        confirmDialog.classList.add('show')
        confirmDialog.textContent = `"${deletedBookTitle}" has been succesfully deleted!`;
        console.log(currentIndexToDelete);
        setTimeout(() => {
            confirmDialog.classList.remove('show')
        }, 2000);

        renderLibrary();
    };
    bookModal.close();
});

cancelBtn.addEventListener('click', () => {
    bookModal.close();
});

function removeBookFromLibrary(index) {
    const bookToDelete = myLibrary[index];

    const confirmationText = document.querySelector('.book-modal p');
    confirmationText.textContent = `Are you sure you want to delete "${bookToDelete.title}" by ${bookToDelete.author}?`;

    bookModal.showModal();

    currentIndexToDelete = index;
}

  
  // initialize the library array on DOM load
  renderLibrary();
  