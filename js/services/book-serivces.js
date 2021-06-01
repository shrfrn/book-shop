'use strict';

const BOOKS_DB = 'BOOKS_DB'
var gBooks;

const PAGE_SIZE = 3;
var gCurrPage = 0;
var gFilterBy = {
    txt: '',
};

_createBooks();

// API
function getBooks() {

    var regex = new RegExp(gFilterBy.txt, 'i')
    var books = gBooks.filter(function(book){
        return regex.test(book.name) || regex.test(book.price) || regex.test(book.rating);
    })

    var startIdx = gCurrPage * PAGE_SIZE;
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}
function removeBook(bookId) {
    var books = _getAllBooks();
    var currBookIdx = books.findIndex(function (book) {
        return book.id === bookId;
    });

    books.splice(currBookIdx, 1);
    saveToStorage(BOOKS_DB, books);
}
function updateBook(bookId, newPrice) {
    var currBook = getBookById(bookId);
    currBook.price = newPrice;
    saveToStorage(BOOKS_DB, _getAllBooks());
}
function updateBookDetails(book){
    var bookToUpdate = getBookById(book.id);
    for (const key in bookToUpdate) {
        bookToUpdate[key] = book[key];
    }
    saveToStorage(BOOKS_DB, _getAllBooks());
}
function addBook(newName, newPrice) {
    var newBook = {
        id: _makeId(),
        name: newName,
        price: newPrice,
        imgUrl: 'default',
        rating: 0,
    }
    _createBook(newBook);
    saveToStorage(BOOKS_DB, _getAllBooks());
    setPageToShow(getLastPageIdx());
}
function setFilter(filterStr){
    gFilterBy.txt = filterStr;
}
function getBookCount(){
    var regex = new RegExp(gFilterBy.txt, 'i');

    var books = gBooks.filter(function(book){
        return regex.test(book.name) || regex.test(book.price) || regex.test(book.rating);
    });
    return books.length;
}
//Private functions
function _getAllBooks(){
    return gBooks;
}
function _createBooks() {

    gBooks = loadFromStorage(BOOKS_DB);
    if (!gBooks || gBooks.length === 0) {
        gBooks = [];
        for (let i = 0; i < 5; i++) {
            var book = {
                id: _makeId(),
                name: `book${i}`,
                price: 10 * i + i,
                imgUrl: `../../img/book${i}.png`,
                rating: i * 2,
            };
            _createBook(book)
        }
        saveToStorage(BOOKS_DB, gBooks);
    }
    return gBooks;
}
function _createBook(book) {
    gBooks.push(book);
}

function getBookById(bookId){
    return _getAllBooks().find(function (book) {
        return book.id === bookId;
    });
}
function getCurrPage(){
    return gCurrPage;
}
function setCurrPage(newPageIdx){
    gCurrPage = newPageIdx;
}
function getLastPageIdx(){
    return Math.floor((getBookCount() - 1) / PAGE_SIZE);
}
function setPageToShow(pageIdx){
    gCurrPage = pageIdx;
}