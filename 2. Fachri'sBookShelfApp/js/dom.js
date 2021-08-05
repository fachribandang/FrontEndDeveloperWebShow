const UN_READED_BOOK_SHELF_ID = "unreadedBookShelfList";
const READED_BOOK_SHELF_ID = "readedBookShelfList";

const buttoSources = 
[
    {
        text:"Pindahkan",
        url:"assets/icon/2x/outline_swap_horiz_black_24dp.png"
    },
    {
        text:"Hapus",
        url:"assets/icon/2x/outline_delete_black_24dp.png"
    },
    {
        text:"Edit",
        url:"assets/icon/2x/outline_edit_black_24dp.png"
    }
];

function addBook() {
    const unreadedBookList = document.getElementById(UN_READED_BOOK_SHELF_ID);
    const readedBookList = document.getElementById(READED_BOOK_SHELF_ID);

    let bookData ={
        id: null,
        title: null,
        author: null,
        year: null,
        isComplete: null
    }
    const timestamp = new Date();
    var n = timestamp.getTime();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isReaded = document.getElementById("inputBookIsReaded");

    bookData.id = timestamp.getTime();
    bookData.title = title;
    bookData.author = author;
    bookData.year = year;
    bookData.isComplete = isReaded.checked;

    const Book = makeBook(title,author,year,bookData.isComplete,bookData.id);

    const bookObject = composeTodoObject(title,author,year,bookData.isComplete,bookData.id);
    bookListData.push(bookObject);

    // unreadedBookList.append(Book);
    // console.log();
    if( bookData.isComplete ){
        readedBookList.append(Book);
    }else{
        unreadedBookList.append(Book);
    }

    updateDataToStorage();
}
function makeBook(title,author,year,isComplete,id){
    // Book Description
    const bookTitle = document.createElement("h2");
    bookTitle.setAttribute("id", "bookTitle");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("id", "bookAuthor");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.setAttribute("id", "bookYear");
    bookYear.innerText = year;

    const bookDescriptionContainer = document.createElement("div");
    bookDescriptionContainer.classList.add("col-8","mx-l","y-center")
    bookDescriptionContainer.append(bookTitle, bookAuthor,bookYear);
    // Book Button
    const bookButtonSetContainer = document.createElement("div");
    bookButtonSetContainer.classList.add("col-4", "mx-l", "right");
    bookButtonSetContainer.append(
        createSwapButton(isComplete,id),
        createDeleteButton(isComplete,id),
        createEditButton(title,author,year,isComplete,id),
        );
    
    // Book Container
    const book = document.createElement("div");
    book.classList.add("row", "py-l");
    book.append(bookDescriptionContainer, bookButtonSetContainer);
    const bookContainer =  document.createElement("div");
    bookContainer.classList.add("col-12", "border", "border-radius-m", "border-primary", "shadow-s", "my-l");
    bookContainer.setAttribute("id","id"+id.toString())
    bookContainer.append(book);

    return bookContainer;

}

function createButton(text, iconUrl, eventListener) {
    const button = document.createElement("button");

    const buttonImage = document.createElement("img");
    buttonImage.setAttribute("src", iconUrl);

    const buttonSpan = document.createElement("span");
    buttonSpan.innerText = text;
    
    button.append(buttonImage,buttonSpan);
    const buttonContainer = document.createElement("div");
    buttonContainer.append(button);
    button.classList.add("button","my-s");
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return buttonContainer;
}
function getTarget(isComplete){
    let target;
    if (isComplete) {
        console.log("buat readed");
        target = document.body.getElementsByClassName("panelBookShelf")[1].querySelector("#readedBookShelfList");
    }else{
        console.log("buat unreaded");
        target = document.body.getElementsByClassName("panelBookShelf")[0].querySelector("#unreadedBookShelfList");
    }

    return target;
}
function createSwapButton(isComplete,id){
    let target;
    target = getTarget(isComplete);
    return createButton(buttoSources[0].text,buttoSources[0].url, function(){
        moveBookToOtherBookShelf(
            target,
            isComplete,
            id
            );
    });
}
function createDeleteButton(isComplete,id){
    let target;
    target = getTarget(isComplete);

    return createButton(buttoSources[1].text,buttoSources[1].url, function(event){
        deleteBook(
            target,
            id
            );
    });
}
function createEditButton(title,author,year,isComplete,id){
    return createButton(buttoSources[2].text,buttoSources[2].url, function(){
        EditBook(title,author,year,isComplete,id);
    });
}

function deleteBook(target,id) {
    let tempid = "#id"+id.toString();
    const taskElement = target.querySelector(tempid);

    const bookPosition = findBookIndex(id);
    bookListData.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();  
} 
function moveBookToOtherBookShelf(target,isComplete,id) {
    console.log(target)
    let tempid = "#id"+id.toString();
    const taskElement = target.querySelector(tempid)
    const bookTitle = taskElement.querySelector("#bookTitle").innerText;
    const bookAuthor = taskElement.querySelector("#bookAuthor").innerText;
    const bookYear = taskElement.querySelector("#bookYear").innerText;

    const Book = makeBook(bookTitle,bookAuthor,bookYear,!isComplete,id);

    const bookObject = findBook(id);
    bookObject.isComplete = !isComplete;

    taskElement.remove();
    if (isComplete){
        const unreadedBookList = document.getElementById(UN_READED_BOOK_SHELF_ID);
        unreadedBookList.append(Book);
    }else{
        const readedBookList = document.getElementById(READED_BOOK_SHELF_ID);
        readedBookList.append(Book);
    }

    updateDataToStorage();
} 

function toggleModal(title,author,year,isComplete,id) {
    const editBookTitlePanel = document.querySelector(".editBookTitlePanel");
    let editInput = document.createElement("input");
    editInput.classList.add("width-max", "py-s");
    editInput.setAttribute("id","editBookTitle");
    editInput.setAttribute("type","text");
    editInput.value=title;
    editInput.required = true;
    editBookTitlePanel.append(editInput);
    editInput = null

    const editBookAuthorPanel = document.querySelector(".editBookAuthorPanel");
    editInput = document.createElement("input");
    editInput.classList.add("width-max", "py-s");
    editInput.setAttribute("id","editBookAuthor");
    editInput.setAttribute("type","text");
    editInput.value=author;
    editInput.required = true;
    editBookAuthorPanel.append(editInput);
    editInput = null

    const editBookYearPanel = document.querySelector(".editBookYearPanel");
    editInput = document.createElement("input");
    editInput.classList.add("width-max", "py-s");
    editInput.setAttribute("id","editBookYear");
    editInput.setAttribute("type","text");
    editInput.value=year;
    editInput.required = true;
    editBookYearPanel.append(editInput);
    editInput = null

    modal.classList.toggle("show-modal");
    const submitEditForm  = document.getElementById("formBookEditor");
    submitEditForm.addEventListener("submit", function (event) {
        event.preventDefault();
        EditExecution(id)
    });
}


function EditBook(title,author,year,isComplete,id){

    toggleModal(title,author,year,isComplete,id);
}

function EditExecution(id){
    const editBookObject = findBook(id);
    const bookEditor = document.querySelector("#formBookEditor");
    const editedBookTitle = bookEditor.querySelector("#editBookTitle").value;
    const editedBookAuthor = bookEditor.querySelector("#editBookAuthor").value;
    const editedBookYear = bookEditor.querySelector("#editBookYear").value;
    
    console.log(editedBookTitle,editedBookAuthor,editedBookYear)
    editBookObject.title = editedBookTitle;
    editBookObject.author = editedBookAuthor;
    editBookObject.year = editedBookYear;
    console.log(editBookObject)
    updateDataToStorage();
    
    const editBookTitlePanel = document.querySelector(".editBookTitlePanel");
    const editBookAuthorPanel = document.querySelector(".editBookAuthorPanel");
    const editBookYearPanel = document.querySelector(".editBookYearPanel");
    editBookTitlePanel.childNodes[3].remove();
    editBookAuthorPanel.childNodes[3].remove();
    editBookYearPanel.childNodes[3].remove();

    location.reload();

}
function applyFilter(){
    const filterKey = document.getElementById("filterKey").value
    const filterSelector =  document.getElementById("filterSelector").value
    for (book of bookListData) {
        switch(filterSelector) {
            case "title":
                updateBookShelfByFilter(book.title,book.id,filterKey);
              break;
            case "author":
                updateBookShelfByFilter(book.author,book.id,filterKey);
              break;
            case "year":
                updateBookShelfByFilter(book.year,book.id,filterKey);
              break;
          } 
    }
}

function updateBookShelfByFilter(key,id,filterKey){
    const bookUiContainer =  document.getElementById("id"+id)
    if (key.includes(filterKey)){
        bookUiContainer.style.display = null;
    }else{
        bookUiContainer.style.display = "none"; 
    }
}

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModal);