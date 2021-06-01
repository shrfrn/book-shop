'use strict';

const DEFAULT_LANG = 'עברית';

var gCurrBook = {};

function init() {
    setCurrLang(DEFAULT_LANG);
    renderBooks(getBooks());
}

function renderBooks(books) {

    $('html').attr('lang', getCurrLang()).attr('dir', getCurrLangDir());

    // Build book table

    var strHTML = '';
    books.forEach(function (book) {
        strHTML += `\t<tr>`
        strHTML += `\t<th scope="row">${book.id}</th>\n`
        strHTML += `\t<td>${book.name}</td>\n`
        strHTML += `\t<td>${book.price}</td>\n`
        strHTML += `\t<td>${book.rating}</td>\n`
        strHTML += `\t<td>
                        <button class="btn btn-outline-secondary" onclick="showModal('${book.id}')">${getTrans("book-details")}</button>
                        <button class="btn btn-outline-secondary" onclick="onUpdateBook('${book.id}')">${getTrans("update")}</button>
                        <button class="btn btn-outline-secondary" onclick="onRemoveBook('${book.id}')">${getTrans("delete")}</button>
                     </td>\n`
        strHTML += `\t</tr>\n`

    });

    var elBookList = $('.book-list');
    elBookList.html(strHTML);

    // Build language selector

    strHTML = '';
    var langs = getLangs();

    for (const key in langs) {
        strHTML += `<option ${(langs[key].code === getCurrLang()) ? 'selected' : ''}>${key}</option>`;
    }

    $('.lang-select').html(strHTML);
    
    // Build pagination buttons

    strHTML = '';
    for (let i = 0; i <= getLastPageIdx(); i++) {
        strHTML += `\t<button class="page-btn btn btn-outline-secondary mr-2 my-2 my-sm-0" onclick="showPage(${i})">${i + 1}</button>\n`
    }
    var elPageButtons = $('.page-buttons');
    elPageButtons.html(strHTML);    
    translatePage();
}
function onAddNewBook() {
    var newName = prompt('New Name:');
    var newPrice = prompt('New Price:');

    addBook(newName, newPrice);
    renderBooks(getBooks());
}
function onUpdateBook(bookId) {
    var newPrice = prompt('New Price:');

    updateBook(bookId, newPrice);
    renderBooks(getBooks());
}
function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks(getBooks());
}
function showModal(bookId) {
    gCurrBook = getBookById(bookId);
    
    var elBookId = $('.book-id');
    var elBookName = $('#book-name');
    var elBookPrice = $('#book-price');
    var elBookRating = $('#book-rating');
    
    elBookId.text(`Book ID: ${gCurrBook.id}`);
    elBookName.val(gCurrBook.name);
    elBookPrice.val(gCurrBook.price);
    elBookRating.val(gCurrBook.rating);

    new bootstrap.Modal(document.getElementById('book-form')).show();
}
function incrementRating(increment){
    var elRating = $('[name=book-rating]');
    var newRating = parseInt(elRating.val()) + increment;
    if (newRating > 10 || newRating < 0) return;
    elRating.val(newRating);
}
function onCloseModal() {

    gCurrBook.name = $('#book-name').val();
    gCurrBook.price = $('#book-price').val();
    gCurrBook.rating = $('#book-rating').val();

    $('#book-form').modal('hide')
    updateBookDetails(gCurrBook);
    renderBooks(getBooks());
}
function movePage(diff){

    var currPage = getCurrPage();
    if (currPage + diff < 0 || currPage + diff > getLastPageIdx() ) {
        return;
    }
    setCurrPage(currPage + diff);
    renderBooks(getBooks());
}
function showPage(pageIdx){
    setCurrPage(pageIdx);
    renderBooks(getBooks());
}
function onSetFilter(filterStr){
    setFilter(filterStr);
    renderBooks(getBooks());
}
function onSelectLang(elSelector){
    setCurrLang(elSelector.value);
    renderBooks(getBooks());
}