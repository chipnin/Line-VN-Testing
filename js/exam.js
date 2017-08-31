/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _security = __webpack_require__(2);

var _security2 = _interopRequireDefault(_security);

var _html = __webpack_require__(7);

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var targetElement = event.target;
    if (targetElement === inputElement || targetElement === dropdownApp || _html2.default.checkIsDescendant(dropdownApp, targetElement)) {
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
    var appName = _security2.default.clearXSS(app.name);
    return '\n        <li class="dropdown-select-app__item">\n            <img class="dropdown-select-app__thumbnail" src="' + app.thumbnailUrl + '" alt="">\n            <span class="dropdown-select-app__name">' + appName + '</span>\n        </li>\n    ';
}

/**
 * Render content of dropdown list
 */
function renderDropdownListApp() {
    var dropDownListHtmlContent = '';

    listApp.forEach(function (app) {
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
    if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        // Do nothing when press key left, up, right, down
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

    var patt = new RegExp(value, 'i');
    var searchResult = [];

    dataSource.forEach(function (app) {
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
    var parentNode = null;

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
var inputElement = document.querySelector('.box-select-app__input');
var dropdownApp = document.querySelector('.dropdown-select-app');
var dataSource = getDataFromDataSource();
var listApp = dataSource;

document.addEventListener("DOMContentLoaded", function (event) {
    inputElement.addEventListener('focus', beginSuggestApp);

    document.addEventListener('click', clickOutSiteInput);

    inputElement.addEventListener('input', suggestApp);

    dropdownApp.addEventListener('click', selectApp);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /**
     * Clear XSS string before display
     * @param  {string} htmlString - HTML string
     * @return {string}
     */
    clearXSS: function clearXSS(htmlString) {
        var res = htmlString.replace('<', '&lt;');
        res = res.replace('<', '&lt;');

        return res;
    }
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /**
     * Check parent and child is relative
     * @param  {Object} parent - parent node
     * @param  {Object} child - child node
     * @return {boolean}
     */
    checkIsDescendant: function checkIsDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }
};

/***/ })
/******/ ]);