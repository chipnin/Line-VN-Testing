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
        <li class="dropdown-select-app__item" data-id="${app.id}">
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
    listApp = searchApp(inputElement.value);

    renderDropdownListApp();
}

/**
 * Action when typing input
 * @param  {Event} event
 * @return {*}
 */
function selectAppWithDirectiveKey(event) {
    if ([13, 38, 40].indexOf(event.keyCode) > -1 && dropdownApp.classList.contains('show')) { // Process when press key enter or key up or key down
        let activeApp = dropdownApp.querySelector('.dropdown-select-app__item.is_active');
        
        if (!activeApp) {
            activeApp = dropdownApp.querySelector('.dropdown-select-app__item');
            activeApp.classList.add('is_active');

            return;
        }

        if (event.keyCode === 13) { // When press enter key
            inputElement.value = activeApp.querySelector('.dropdown-select-app__name').textContent;
            event.preventDefault();
            hideDropdownApp();

            return;
        }

        let listApp = dropdownApp.querySelectorAll('.dropdown-select-app__item');
        let totalApp = listApp.length;

        if (totalApp === 1) {
            return;
        }

        let nextApp = activeApp;
        let activeAppIndex = 0;
        let nextAppIndex = 0;
        let activeAppId = activeApp.getAttribute('data-id');

        // Find index of active app
        listApp.forEach((app, index) => {
            app.classList.remove('is_active');
            let appId = app.getAttribute('data-id');
            
            if (appId === activeAppId) {
                activeAppIndex = index;
            }
        });

        switch (activeAppIndex) {
            case 0:
                if (event.keyCode === 38) { // when key up
                    nextAppIndex = activeAppIndex;
                } else {
                    nextAppIndex = activeAppIndex + 1;
                }
                
                break;
            case totalApp - 1:
                if (event.keyCode === 38) { // when key up
                    nextAppIndex = activeAppIndex - 1;
                } else {
                    nextAppIndex = activeAppIndex;
                }

                break;
            default:
                if (event.keyCode === 38) { // when key up
                    nextAppIndex = activeAppIndex - 1;
                } else {
                    nextAppIndex = activeAppIndex + 1;
                }

                break;
        }

        nextApp = listApp[nextAppIndex];
        // Add active class for next app
        nextApp.classList.add('is_active');

        // Scroll dropdown list apps
        dropdownApp.scrollTop = nextApp.offsetHeight * (nextAppIndex - 1);

        return;
    }
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
        hideDropdownApp();
        return;
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
    inputElement.addEventListener('keydown', selectAppWithDirectiveKey);

    dropdownApp.addEventListener('click', selectApp);
});