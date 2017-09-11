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

var _html = __webpack_require__(3);

var _html2 = _interopRequireDefault(_html);

var _storage = __webpack_require__(8);

var _storage2 = _interopRequireDefault(_storage);

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
    return '\n        <li class="dropdown-select-app__item" data-id="' + app.id + '">\n            <img class="dropdown-select-app__thumbnail" src="' + app.thumbnailUrl + '" alt="">\n            <span class="dropdown-select-app__name">' + appName + '</span>\n        </li>\n    ';
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
    showDropdownApp();

    listApp = searchApp(inputElement.value);

    renderDropdownListApp();
}

/**
 * Action when typing input
 * @param  {Event} event
 * @return {*}
 */
function selectAppWithDirectiveKey(event) {
    if ([13, 38, 40].indexOf(event.keyCode) > -1 && dropdownApp.classList.contains('show')) {
        // Process when press key enter or key up or key down
        var activeApp = dropdownApp.querySelector('.dropdown-select-app__item.is_active');

        if (!activeApp) {
            activeApp = dropdownApp.querySelector('.dropdown-select-app__item');
            activeApp.classList.add('is_active');

            return;
        }

        if (event.keyCode === 13) {
            // When press enter key
            inputElement.value = activeApp.querySelector('.dropdown-select-app__name').textContent;

            inputHistoryStorage.add(inputElement.value); // Add input value to Local Storage

            event.preventDefault();
            hideDropdownApp();

            return;
        }

        var _listApp = dropdownApp.querySelectorAll('.dropdown-select-app__item');
        var totalApp = _listApp.length;

        if (totalApp === 1) {
            return;
        }

        var nextApp = activeApp;
        var activeAppIndex = 0;
        var nextAppIndex = 0;
        var activeAppId = activeApp.getAttribute('data-id');

        // Find index of active app
        _listApp.forEach(function (app, index) {
            app.classList.remove('is_active');
            var appId = app.getAttribute('data-id');

            if (appId === activeAppId) {
                activeAppIndex = index;
            }
        });

        switch (activeAppIndex) {
            case 0:
                if (event.keyCode === 38) {
                    // when key up
                    nextAppIndex = activeAppIndex;
                } else {
                    nextAppIndex = activeAppIndex + 1;
                }

                break;
            case totalApp - 1:
                if (event.keyCode === 38) {
                    // when key up
                    nextAppIndex = activeAppIndex - 1;
                } else {
                    nextAppIndex = activeAppIndex;
                }

                break;
            default:
                if (event.keyCode === 38) {
                    // when key up
                    nextAppIndex = activeAppIndex - 1;
                } else {
                    nextAppIndex = activeAppIndex + 1;
                }

                break;
        }

        nextApp = _listApp[nextAppIndex];
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
    var strSearch = value.trim();

    if (strSearch === '') {
        return dataSource;
    }

    var patt = new RegExp(strSearch, 'i');
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
        hideDropdownApp();
        return;
    }

    inputElement.value = parentNode.querySelector('.dropdown-select-app__name').textContent;

    inputHistoryStorage.add(inputElement.value); // Add input value to Local Storage

    hideDropdownApp();
}

// Global variables
var inputElement = document.querySelector('.box-select-app__input');
var dropdownApp = document.querySelector('.dropdown-select-app');
var dataSource = getDataFromDataSource();
var listApp = dataSource;

var inputHistoryStorage = new _storage2.default('linevn-input-history');

document.addEventListener("DOMContentLoaded", function (event) {
    inputElement.addEventListener('focus', beginSuggestApp);

    document.addEventListener('click', clickOutSiteInput);

    inputElement.addEventListener('input', suggestApp);
    inputElement.addEventListener('keydown', selectAppWithDirectiveKey);

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
/* 3 */
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

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage(key) {
        _classCallCheck(this, Storage);

        this.key = key;
        this.store = [];

        this.load();
    }

    /**
     * Load data from Local Storage
     */


    _createClass(Storage, [{
        key: "load",
        value: function load() {
            var dataString = window.localStorage.getItem(this.key);

            if (dataString) {
                this.store = JSON.parse(dataString);
            }
        }

        /**
         * Add input history into storage
         * @param {string} value - input history
         */

    }, {
        key: "add",
        value: function add(value) {
            this.store.unshift(value);

            window.localStorage.setItem(this.key, JSON.stringify(this.store));
        }
    }]);

    return Storage;
}();

exports.default = Storage;

/***/ })
/******/ ]);