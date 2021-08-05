const STORAGE_KEY = "BOOK_SHELF_APPS";
 
let bookListData = [];
 
function isStorageExist(){
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}

function saveData() {
    const parsed = JSON.stringify(bookListData);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }

 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        bookListData = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }

 function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }

 function composeTodoObject(title,author,year,isComplete,id) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    };
 }

 function findBook(bookId) {
    for(book of bookListData){
        if(book.id == bookId)
            return book;
    }
    return null;
 }

 function findBookIndex(bookId) {
    let index = 0
    for (book of bookListData) {
        if(book.id == bookId)
            return index;
  
        index++;
    }
  
    return -1;
 }

 function refreshDataFromBookList() {
    let unreadedBookList = document.getElementById(UN_READED_BOOK_SHELF_ID);
    let readedBookList = document.getElementById(READED_BOOK_SHELF_ID);
  
  
    for(buku of bookListData){
        const Book = makeBook(buku.title,buku.author,buku.year,buku.isComplete,buku.id);  
  
        if(buku.isComplete){
            readedBookList.append(Book);
        } else {
            unreadedBookList.append(Book);
        }
    }
 }