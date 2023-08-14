let myLibrary = [];

const addButton = document.querySelector(".addButton");
const dialog = document.getElementById("addDialog");
const addForm = document.querySelector(".addForm");
const cancelAddBtn = document.querySelector(".cancelAdd");
const submitButton = document.querySelector(".submit");



//possibly set the return value of the dialog dialog box to the object constructor



addButton.addEventListener("click", ()=>{
    dialog.showModal();
})

cancelAddBtn.addEventListener("click", ()=>{
    dialog.close();
})

function Book (title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

//create the book instance and add to the array
addForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    dialog.close();
    createBookObj();
})


function createBookObj(){

    let author = document.getElementById("title").value;
    let title = document.getElementById("author").value;
    let pages = document.getElementById("pageNum").value;
    //boolean that checks the value of read and returns t/f
    let readStatus = document.querySelector("input[name=readStatus]:checked").value === "read" ? true : false;
    let bookToAdd = new Book (title, author, pages, readStatus); 
    appendLibArr(bookToAdd);
}

function appendLibArr(bookToAdd){
    myLibrary.push(bookToAdd);
    addBookToLibrary();
}

function addBookToLibrary(){
    //delete all existing books in library to avoid duplicates
    
    for (book in myLibrary){
        console.table(myLibrary[book]);
        //create element card
        //create and populate title, author, pages, readStatus
        //Add class for each card for styling
    }
}