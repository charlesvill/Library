var LibraryInitializer = (()=>{
    const addButton = document.querySelector(".addButton");
    const dialog = document.getElementById("addDialog");
    const addForm = document.querySelector(".addForm");
    const cancelAddBtn = document.querySelector(".cancelAdd");
    
    const openForm = () => {
        dialog.showModal();
    }
    const cancelEntry = () => {
        clearForm();
        dialog.close();
    }
    const submitForm = (event) => {
        event.preventDefault();
        library.addBook();
        clearForm();
        dialog.close();

    }
    const clearForm = () => {
        const form = document.querySelector("form");
        form.reset();
    }
    
    addButton.onclick = openForm;
    cancelAddBtn.onclick = cancelEntry;
    addForm.onsubmit = submitForm;

})();

class Library {
    constructor(){
        this.collection = [];
    }

    addToCollection(newBook){
        if (!this.isInCollection(newBook)){
            this.collection.push(newBook); 
            this.updateGrid(this.collection);
        }
    }

    isInCollection(newBook){
        return this.collection.some((item) => item.title === newBook.title)
    }

    addBook(){
        let author = document.getElementById("author").value;
        let title = document.getElementById("title").value;
        let pages = document.getElementById("pageNum").value;
        let readStatus = document.querySelector("input[name=readStatus]:checked").value === "read" ? true : false;
        let newBook = new Book (title, author, pages, readStatus); 
        this.addToCollection(newBook);
    }

    updateGrid (bookCollection){
        const oldBooks = document.querySelectorAll(".bookCont");
        oldBooks.forEach(element => element.remove());
       
        let index = 0;
        for (let book in bookCollection){
            this.createBookCont(bookCollection[book] , index);
            index++;
        }
    }

    createBookCont (bookInfo, index){
        
        const containerDiv = document.querySelector(".contentCont");
    
        const bookCont = document.createElement("div");
        bookCont.className = "bookCont";
        bookCont.dataset.index = `${index}`;
    
        const titleElement = document.createElement("p");
        titleElement.className = "title";
        titleElement.textContent = bookInfo.title;
        if(this.collection[index].readStatus){
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
            if(!this.collection[index].readStatus){
                titleElement.classList.add("isRead");
                this.collection[index].readStatus = true;
            }
            else{
                titleElement.classList.remove("isRead");
                this.collection[index].readStatus = false;
            }
            
        })
    
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "removeBtn";
        removeButton.addEventListener('click', (e)=> this.removeBook(e ));
        // Append elements to bookCont
        bookCont.appendChild(titleElement);
        bookCont.appendChild(authorElement);
        bookCont.appendChild(pagesElement);
        bookCont.appendChild(readButton);
        bookCont.appendChild(removeButton);
        containerDiv.appendChild(bookCont);
        // add an event listener to the remove button that will not exist before the card is instantiated.
        
    }

    removeBook(e){
        console.log("a function is being activated");
        const parentElement = e.currentTarget.parentElement;
        const parentDataIndex = parentElement.getAttribute("data-index");
        this.collection.splice(parentDataIndex, 1);
        parentElement.remove();
        
    }

}

const library = new Library(); 

class Book {

    constructor(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

}