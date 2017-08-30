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

var _security = __webpack_require__(6);

var _security2 = _interopRequireDefault(_security);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataFromDataSource() {
    return TABLE_DATA;
}

function appendAppWithTemplateItem(app) {
    var appName = _security2.default.clearXSS(app.name);
    return '\n        <li class="dropdown-select-app__item" onclick="selectApp(' + app.id + ')">\n            <img class="dropdown-select-app__thumbnail" src="' + app.thumbnailUrl + '" alt="">\n            <span class="dropdown-select-app__name">' + appName + '</span>\n        </li>\n    ';
}

function renderDropdownListApp() {
    var dropDownListHtmlContent = '';

    listApp.forEach(function (app) {
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

    var patt = new RegExp(value, 'i');
    var searchResult = [];

    listApp.forEach(function (app) {
        if (patt.test(app.name)) {
            searchResult.push(app);
        }
    });

    return searchResult;
}

function selectApp(appId) {
    console.log(appId);
    var app = listApp.find(function (app) {
        var indexApp = listApp.indexOf(app);
        return indexApp > -1;
    });

    inputElement.value = app.name;
}

var inputElement = document.querySelector('.box-select-app__input');
var dropdownApp = document.querySelector('.dropdown-select-app');
var listApp = getDataFromDataSource();

document.addEventListener("DOMContentLoaded", function (event) {
    inputElement.addEventListener('focus', beginSuggestApp);

    inputElement.addEventListener('focusout', hideDropdownApp);

    inputElement.addEventListener('input', suggestApp);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
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

/***/ })
/******/ ]);