let myLibrary = [];

const addButton = document.querySelector(".addButton");
const dialog = document.getElementById("addDialog");
const addForm = document.querySelector(".addForm");
const cancelAddBtn = document.querySelector(".cancelAdd");
const submitButton = document.querySelector(".submit");



// document.addEventListener("load", addBookToLibrary());
//possibly set the return value of the dialog dialog box to the object constructor



addButton.addEventListener("click", ()=>{
    dialog.showModal();
    clearForm();
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

function clearForm(){
    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pageNum").value;
    //boolean that checks the value of read and returns t/f
    let readStatus = document.querySelector("input[name=readStatus]:checked").value;
    author = "";
    title = "";
    pages = "";
    console.log("form should be cleared");
}

//create the book instance and add to the array
addForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    createBookObj();
    dialog.close();

})


function createBookObj(){

    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pageNum").value;
    //boolean that checks the value of read and returns t/f
    let readStatus = document.querySelector("input[name=readStatus]:checked").value === "read" ? true : false;
    
    
    
    let bookToAdd = new Book (title, author, pages, readStatus); 
    appendLibArr(bookToAdd);
        
    
}

// function titleCheck(title){
//     myLibrary.forEach(element => {
//         if(element.title === title){
//             alert("this book already added");
//             return false;
//         }       
//     });
//     return true;
// }

function appendLibArr(bookToAdd){
    myLibrary.push(bookToAdd);
    addBookToLibrary();
}

function addBookToLibrary(){
    //delete all existing books in library to avoid duplicates
    const oldBooks = document.querySelectorAll(".bookCont");
    oldBooks.forEach(element => element.remove());
   
    let index = 0;
    for (book in myLibrary){
        createBookCont(myLibrary[book] , index);
        index++;
    }
}

function createBookCont (bookInfo, index){
    //create and populate title, author, pages, readStatus
    //append the element to the parent contaier
    //Add class for each card for styling
    const containerDiv = document.querySelector(".contentCont");

    const bookCont = document.createElement("div");
    bookCont.className = "bookCont";
    bookCont.dataset.index = `${index}`;

    const titleElement = document.createElement("p");
    titleElement.className = "title";
    titleElement.textContent = bookInfo.title;
    if(myLibrary[index].readStatus){
        titleElement.classList.add("isRead");
    }
    const authorElement = document.createElement("p");
    authorElement.className = "author";
    authorElement.textContent = bookInfo.author;

    const pagesElement = document.createElement("p");
    pagesElement.className = "pages";
    pagesElement.textContent = bookInfo.pages;

    const readButton = document.createElement("button");
    readButton.textContent = "Read";

    readButton.addEventListener('click', ()=>{
        console.log("button is being clicked");
        if(!myLibrary[index].readStatus){
            titleElement.classList.add("isRead");
            myLibrary[index].readStatus = true;
        }
        else{
            titleElement.classList.remove("isRead");
            myLibrary[index].readStatus = false;
        }
        
    })

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "removeBtn";
    removeButton.addEventListener('click', removeBook);
    // Append elements to bookCont
    bookCont.appendChild(titleElement);
    bookCont.appendChild(authorElement);
    bookCont.appendChild(pagesElement);
    bookCont.appendChild(readButton);
    bookCont.appendChild(removeButton);
    containerDiv.appendChild(bookCont);
    // add an event listener to the remove button that will not exist before the card is instantiated.
    
}

function removeBook(e){
    console.log("a function is being activated");
    const parentElement = e.currentTarget.parentElement;
    const parentDataIndex = parentElement.getAttribute("data-index");
    myLibrary.splice(parentDataIndex,1);
    parentElement.remove();
    
}

