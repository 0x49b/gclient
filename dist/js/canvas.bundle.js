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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var stepsize = 20;
var movesize = stepsize;

var canvasTouchBorder = '#CA2C68';
var canvasNormalBorder = '#707070';

/*
canvas.width = innerWidth - 10
canvas.height = innerHeight - 10
*/

canvas.width = 1000;
canvas.height = 800;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f39c12', '#d35400', '#bdc3c7', '#7f8c8d'];

var colornames = ['darkgreen', 'lightgreen', 'blue', 'purple', 'black', 'yellow', 'orange', 'red', 'lightgrey', 'grey'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('keydown', function (e) {

    // First the main directions, then diagonal

    var x = object.x;
    var y = object.y;

    if (e.key == 'w' || e.key == 'ArrowUp') {
        y -= movesize;
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
        x -= movesize;
    } else if (e.key == 's' || e.key == 'ArrowDown') {
        y += movesize;
    } else if (e.key == 'd' || e.key == 'ArrowRight') {
        x += movesize;
    } else {
        console.log(e);
    }
    setPosition(object, x, y);
    logPosition(object);
    sendPosition(object);
});

function setPosition(object, x, y) {

    canvas.style.borderColor = canvasNormalBorder;

    if (x > canvas.width - object.radius) {
        x = canvas.width - object.radius;
        canvas.style.borderColor = canvasTouchBorder;
    }

    if (x < 0 + object.radius) {
        x = 0 + object.radius;
        canvas.style.borderColor = canvasTouchBorder;
    }

    if (y > canvas.height - object.radius) {
        y = canvas.height - object.radius;
        canvas.style.borderColor = canvasTouchBorder;
    }

    if (y < 0 + object.radius) {
        y = 0 + object.radius;
        canvas.style.borderColor = canvasTouchBorder;
    }

    object.x = x;
    object.y = y;
}

function sendPosition(object) {
    console.log("send position to server over ws");
}

function logPosition(object) {
    console.log(object.uuid + ' position: ' + object.x + '/' + object.y);
}

function getNameforColor(color, colors, colornames) {
    return colornames[colors.indexOf(color)];
}

function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
}

function getLengthForText(text) {
    var fontSize = 12;
    var body = document.body;
    var para = document.createElement('div');
    para.textContent = "Hello";
    para.style.fontSize = fontSize;

    //para.style.display = 'inline'
    para.style.position = 'absolute';
    para.style.visibility = 'hidden';
    para.style.height = 'auto';
    para.style.width = 'auto';
    para.style.whiteSpace = 'nowrap';

    body.appendChild(para);

    var cwidth = para.clientWidth + 1;

    console.log("WIDTH: " + cwidth);
    console.log("2WIDTH: " + Math.floor(cwidth / 2));
    para.parentNode.removeChild(para);
    return cwidth;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

// Objects
function Object(x, y, radius, color, colorname, namelength, uuid) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.fontcolor = getContrastYIQ(this.color);
    this.name = colorname;
    this.namelength = namelength;
    this.uuid = uuid;
}

Object.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.fillStyle = this.fontcolor;
    c.fillText(this.name, this.x - Math.floor(this.namelength / 2), this.y);
    c.fillStyle = this.color;
};

Object.prototype.update = function () {
    this.draw();
};

// Implementation
var bubbles = void 0;
var object = void 0;

function init() {

    bubbles = [];

    // player bubble
    var color = (0, _utils.randomColor)(colors);
    var name = getNameforColor(color, colors, colornames);
    var startX = Math.round(Math.floor(Math.random() * canvas.width) / 10) * 10;
    var startY = Math.round(Math.floor(Math.random() * canvas.height) / 10) * 10;
    object = new Object(startX, startY, stepsize, color, name, getLengthForText(name), uuidv4());
    bubbles.push(object);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    //object.update()

    bubbles.forEach(function (bubble) {
        bubble.update();
    });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map