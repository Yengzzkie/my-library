let myLibrary = [
    // { id: 1, title: "Hobbit", author: "JK Rowling", pages: "185", isRead: "Read" }
  ];
  
  // Object constructor
  function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  // Main function to add the book to the array
  const submitBtn = document.getElementById("submitButton").addEventListener("click", function addBook(event) {

      event.preventDefault();
  
      const inputTitle = document.getElementById("title").value;
      const inputAuthor = document.getElementById("author").value;
      const inputPages = document.getElementById("pages").value;
      const inputRead = document.getElementById("isRead").checked;
  
      const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead ? "Read" : "Not read");
      
      myLibrary.push(newBook);
      saveToLocalStorage();
      displayBook();
  
      //Clears the input field upon submission and close the modal
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("pages").value = "";
      modal.close();
    });
  
  // Displays the book information to the DOM
  function displayBook() {
    const objContainer = document.querySelector(".objContainer");
  
    objContainer.innerHTML = "";
  
    myLibrary.forEach((book, index) => {
      const bookObj = document.createElement("div");
      const p = document.createElement("p");
      const deleteBtn = document.createElement("button");
      

      objContainer.appendChild(bookObj);
      bookObj.appendChild(p);
      bookObj.appendChild(deleteBtn);
  
      bookObj.classList.add("book");
      p.style.whiteSpace = "pre-line";
      p.textContent = `Index: ${index} \nTitle: ${book.title}\nAuthor: ${book.author} \nPages: ${book.pages} \nStatus: ${book.isRead}`;
      deleteBtn.textContent = "Delete";
    });
  }

  document.querySelector(".objContainer").addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON" && event.target.textContent === "Delete") {
      const bookModal = document.querySelector(".book-modal");
      const bookObj = event.target.parentNode; // parent of the delete button
  
      bookModal.showModal();
  
      const confirmBtn = document.querySelector(".confirm-btn");
      const cancelBtn = document.querySelector(".cancel-btn");
  
      confirmBtn.addEventListener("click", function () {
        const objContainer = document.querySelector(".objContainer");
        objContainer.removeChild(bookObj);
        bookModal.close();
      });
  
      cancelBtn.addEventListener("click", function () {
        bookModal.close();
      });
    }
  });
  
  // loadFromLocalStorage();
  displayBook();
  
  // Function to save myLibrary to local storage
  function saveToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }
  
  // Function to load myLibrary from local storage
  function loadFromLocalStorage() {
    const storedLibrary = localStorage.getItem("myLibrary");
  
    if (storedLibrary) {
      myLibrary = JSON.parse(storedLibrary);
    }
  }
  
  // Modal Button functionalities
  const modal = document.querySelector(".modal");
  const addBookBtn = document
    .querySelector(".add-book-btn")
    .addEventListener("click", function () {
      modal.showModal();
    });
  
  const closeModalBtn = document
    .querySelector(".close-modal")
    .addEventListener("click", function () {
      modal.close();
    });
  