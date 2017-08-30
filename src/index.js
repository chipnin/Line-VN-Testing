import './sass/main.scss';

import security from './utils/security';

function getDataFromDataSource() {
    return TABLE_DATA;
}

function appendAppWithTemplateItem(app) {
    const appName = security.clearXSS(app.name);
    return `
        <li class="dropdown-select-app__item" onclick="selectApp(${app.id})">
            <img class="dropdown-select-app__thumbnail" src="${app.thumbnailUrl}" alt="">
            <span class="dropdown-select-app__name">${appName}</span>
        </li>
    `;
}

function renderDropdownListApp() {
    let dropDownListHtmlContent = '';
    
    listApp.forEach((app) => {
        dropDownListHtmlContent += appendAppWithTemplateItem(app);
    });
    console.log(listApp);
    dropdownApp.innerHTML = dropDownListHtmlContent;
}

function showDropdownApp() {
    dropdownApp.classList.add('show');
}

function hideDropdownApp() {
    dropdownApp.classList.remove('show');
}

function beginSuggestApp() {
    renderDropdownListApp();
    showDropdownApp();
}

function suggestApp(event) {
    if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        return;
    }
    
    listApp = searchApp(inputElement.value);

    renderDropdownListApp();
}

function searchApp(value) {
    if (value === '') {
        return getDataFromDataSource();
    }

    let patt = new RegExp(value, 'i');
    let searchResult = [];

    listApp.forEach((app) => {
        if (patt.test(app.name)) {
            searchResult.push(app);
        }
    });

    return searchResult;
}

function selectApp(appId) {
    console.log(appId);
    let app = listApp.find((app) => {
        let indexApp = listApp.indexOf(app);
        return indexApp > -1;
    });

    inputElement.value = app.name;
}

let inputElement = document.querySelector('.box-select-app__input');
let dropdownApp = document.querySelector('.dropdown-select-app');
let listApp = getDataFromDataSource();

document.addEventListener("DOMContentLoaded", function(event) { 
    inputElement.addEventListener('focus', beginSuggestApp);

    inputElement.addEventListener('focusout', hideDropdownApp);

    inputElement.addEventListener('input', suggestApp);
});