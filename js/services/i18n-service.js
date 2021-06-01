'use strict';

var gCurrLang = 'he';
var gCurrLangDir = 'rtl';

var gLangs = {
    Spanish: {code: 'es', dir: 'ltr'},
    English: {code: 'en', dir: 'ltr'},
    עברית: {code: 'he', dir: 'rtl'},
};

var gTrans = {
    'welcome-title': {
        en: 'Welcome to my bookshop!',
        es: 'Mis Cosas Por Hacer',
        he: 'ברוכים הבאים לחנות הספרים'
    },
    'page-title': {
        en: 'Book Shop',
        es: 'Mis Cosas Por Hacer',
        he: 'חנות הספרים'
    },
    'brand': {
        en: 'Bookshop',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'תולעת ספרים',
    },
    'book-details': {
        en: 'read',
        es: 'Todos',
        he: 'פרטים',
    },
    'update': {
        en: 'update',
        es: 'Activo',
        he: 'עדכן'
    },
    'delete': {
        en: 'delete',
        es: 'Completo',
        he: 'מחק',
    },
    'actions': {
        en: 'actions',
        es: 'Completo',
        he: 'פעולות',
    },
    'search': {
        en: 'search...',
        es: 'Hacer',
        he: 'חפש...',
    },
    'prev': {
        en: 'prev',
        es: 'Activo',
        he: 'הקודם',
    },
    'next': {
        en: 'next',
        es: 'Aggregar',
        he: 'הבא',
    },
    'price': {
        en: 'price',
        es: 'Estas Seguru?',
        he: 'מחיר',
    },
    'book-title': {
        en: 'book name',
        es: 'Estas Seguru?',
        he: 'שם הספר',
    },
    'rating': {
        en: 'rating',
        es: 'Estas Seguru?',
        he: 'דירוג',
    },
    'ISBN': {
        en: 'ISBN',
        es: 'Que te tienes que hacer?',
        he: 'מזהה'
    },
}

function getTrans(transKey) {
    if (!gTrans[transKey]) return '???';
    if (gTrans[transKey][gCurrLang] === '') return gTrans[transKey][DEFAULT_LANG];
    return gTrans[transKey][gCurrLang];
}
function translatePage(){
    var els = document.querySelectorAll('[data-trans]');

    els.forEach(function(el){
        var str = getTrans(el.dataset.trans);
        if (el.nodeName === 'INPUT' || el.nodeName === 'SELECT')    el.placeholder = str;
        else el.innerText = str;
    });
}
function getLangs() {
    return gLangs;
}

function getCurrLang() {
    return gCurrLang;
}

function getCurrLangDir() {
    return gCurrLangDir;
}

function setCurrLang(langName) {
    gCurrLang = gLangs[langName].code;
    gCurrLangDir = gLangs[langName].dir;
}