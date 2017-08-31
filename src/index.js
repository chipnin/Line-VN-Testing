import './sass/main.scss';

import securityLib from './utils/security';
import htmlLib from './utils/html';

/**
 * Get data from data source
 * @return {Object}
 */
function getDataFromDataSource() {
    return TABLE_DATA;
}

/**
 * Action when click outsite input and dropdownlist
 * @param  {Event} event
 * @return {*}
 */
function clickOutSiteInput(event) {
    let targetElement = event.target;
    if (targetElement === inputElement 
        || targetElement === dropdownApp 
        || htmlLib.checkIsDescendant(dropdownApp, targetElement)) {
        return;
    }

    hideDropdownApp();
}

/**
 * Append app with html template
 * @param  {Object} app - App data
 * @return {string} - HTML string
 */
function appendAppWithTemplateItem(app) {
    const appName = securityLib.clearXSS(app.name);
    return `
        <li class="dropdown-select-app__item">
            <img class="dropdown-select-app__thumbnail" src="${app.thumbnailUrl}" alt="">
            <span class="dropdown-select-app__name">${appName}</span>
        </li>
    `;
}

/**
 * Render content of dropdown list
 */
function renderDropdownListApp() {
    let dropDownListHtmlContent = '';
    
    listApp.forEach((app) => {
        dropDownListHtmlContent += appendAppWithTemplateItem(app);
    });
    
    dropdownApp.innerHTML = dropDownListHtmlContent;
}

/**
 * Show dropdown list apps
 */
function showDropdownApp() {
    dropdownApp.classList.add('show');
}

/**
 * Hide dropdown list apps
 */
function hideDropdownApp() {
    dropdownApp.classList.remove('show');
}

/**
 * Action when focus input
 */
function beginSuggestApp() {
    renderDropdownListApp();
    showDropdownApp();
}

/**
 * Action when typing input
 * @param  {Event} event
 * @return {*}
 */
function suggestApp(event) {
    if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) { // Do nothing when press key left, up, right, down
        return;
    }
    
    listApp = searchApp(inputElement.value);

    renderDropdownListApp();
}

/**
 * Search app when typeing input
 * @param  {string} value - Value of input
 * @return {Array}
 */
function searchApp(value) {
    if (value === '') {
        return dataSource;
    }

    let patt = new RegExp(value, 'i');
    let searchResult = [];

    dataSource.forEach((app) => {
        if (patt.test(app.name)) {
            searchResult.push(app);
        }
    });

    return searchResult;
}

/**
 * Handler event when click dropdown list
 * @param  {Event} event
 */
function selectApp(event) {
    let parentNode = null;
    
    if (event.target.className === 'dropdown-select-app__item') {
        parentNode = event.target;
    }

    if (event.target.parentNode.className === 'dropdown-select-app__item') {
        parentNode = event.target.parentNode;
    }

    if (!parentNode) {
        return;
        hideDropdownApp();
    }

    inputElement.value = parentNode.querySelector('.dropdown-select-app__name').textContent;

    hideDropdownApp();
}

// Global variables
let inputElement = document.querySelector('.box-select-app__input');
let dropdownApp = document.querySelector('.dropdown-select-app');
let dataSource = getDataFromDataSource();
let listApp = dataSource;

document.addEventListener("DOMContentLoaded", function(event) { 
    inputElement.addEventListener('focus', beginSuggestApp);

    document.addEventListener('click', clickOutSiteInput);

    inputElement.addEventListener('input', suggestApp);

    dropdownApp.addEventListener('click', selectApp);
});