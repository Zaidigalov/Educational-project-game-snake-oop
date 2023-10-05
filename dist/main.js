/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/button.js":
/*!**************************!*\
  !*** ./src/js/button.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class SizeButtonModule {
  constructor() {
    this.sizeButton = document.querySelector(".size__button");
    this.sizeList = document.querySelector(".size__list");
    this.sizeListItem = document.querySelectorAll(".size__list__item");
  }
  showSizeList() {
    this.sizeList = document.querySelector(".size__list");
    this.sizeList.classList.toggle("size__list_visible");
  }
  hideSizeList(e) {
    this.sizeButton = document.querySelector(".size__button");
    this.sizeList = document.querySelector(".size__list");
    if (e.target !== this.sizeButton) {
      this.sizeList.classList.remove("size__list_visible");
    }
  }
  changeButtonText(item) {
    item.addEventListener("click", function () {
      this.sizeButton = document.querySelector(".size__button");
      this.sizeButton.innerText = this.innerText;
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SizeButtonModule);

/***/ }),

/***/ "./src/js/field.js":
/*!*************************!*\
  !*** ./src/js/field.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FieldModule {
  constructor() {}
  fieldSize(width, height, cellQty) {
    this.container = document.querySelector(".container");
    this.fieldContainer = this.container.querySelector(".field__container");
    this.field = document.createElement("div");
    this.fieldContainer.append(this.field);
    this.field.classList.add("field");
    for (let i = 1; i < cellQty + 1; i++) {
      this.cell = document.createElement("div");
      this.field.appendChild(this.cell);
      this.cell.classList.add("cell");
    }
    this.field.style.width = width + "px";
    this.field.style.height = height + "px";
    document.querySelector(".instruction").style.display = "block";
  }
  setCoordinates(cellQty) {
    this.rowLength = cellQty ** 0.5;
    this.x = 1;
    this.y = this.rowLength;
    this.cell = document.getElementsByClassName("cell");
    for (let i = 0; i < cellQty; i++) {
      if (this.x > this.rowLength) {
        this.x = 1;
        this.y = this.y - 1;
      }
      this.cell[i].setAttribute("X", this.x);
      this.cell[i].setAttribute("Y", this.y);
      this.x++;
    }
    return this.rowLength;
  }
  removeField() {
    this.field.remove();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldModule);

/***/ }),

/***/ "./src/js/food.js":
/*!************************!*\
  !*** ./src/js/food.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FoodModule {
  constructor() {}
  generateFood(rowLength) {
    this.posX = Math.ceil(Math.random() * rowLength);
    this.posY = Math.ceil(Math.random() * rowLength);
    return [this.posX, this.posY];
  }
  createFood(rowLength) {
    this.coordinatesFood = this.generateFood(rowLength);
    this.food = document.querySelector('[X = "' + this.coordinatesFood[0] + '"][Y = "' + this.coordinatesFood[1] + '"]');
    while (this.food.classList.contains("snake_body") || this.food.classList.contains("snake_head")) {
      this.coordinatesFood = this.generateFood(rowLength);
      this.food = document.querySelector('[X = "' + this.coordinatesFood[0] + '"][Y = "' + this.coordinatesFood[1] + '"]');
    }
    this.food.classList.add("food");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FoodModule);

/***/ }),

/***/ "./src/js/score.js":
/*!*************************!*\
  !*** ./src/js/score.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ScoreModule {
  constructor() {
    this.score = 0;
    this.record = localStorage.getItem("record");
  }
  increaseScore() {
    this.score += 1;
    document.querySelector(".score__value").innerText = this.score;
    return this.score;
  }
  rememberRecord() {
    if (localStorage.getItem("record") == null) {
      this.record = 0;
    } else {
      this.record = localStorage.getItem("record");
    }
    document.querySelector(".record__value").innerText = this.record;
    if (this.score > this.record) {
      document.querySelector(".record__value").innerText = this.score;
    }
    localStorage.setItem("record", document.querySelector(".record__value").innerText);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreModule);

/***/ }),

/***/ "./src/js/snake.js":
/*!*************************!*\
  !*** ./src/js/snake.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./food */ "./src/js/food.js");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./score */ "./src/js/score.js");
/* harmony import */ var _walls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./walls */ "./src/js/walls.js");



class SnakeModule {
  constructor() {
    this.flag = false;
    this.speed = 500;
    this.foodModule = new _food__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.scoreModule = new _score__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.wallsModule = new _walls__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.closedWalls = 1;
    this.wallsModule.checkbox.addEventListener("click", () => {
      if (this.flag == false) {
        this.closedWalls += 1;
        return this.closedWalls;
      }
    });
  }
  generateSnake(length) {
    this.rowLength = length;
    this.posX = Math.round(this.rowLength / 2);
    this.posY = Math.round(this.rowLength / 2);
    this.snakeBody = [document.querySelector('[X = "' + this.posX + '"][Y = "' + this.posY + '"]'), document.querySelector('[X = "' + this.posX + '"][Y = "' + (this.posY - 1) + '"]')];
    this.snakeLength = this.snakeBody.length;
    for (let i = 0; i < this.snakeLength; i++) {
      this.snakeBody[i].classList.add("snake_body");
    }
    this.snakeBody[0].classList.add("snake_head");
    this.snakeBody[0].classList.remove("snake_body");
    this.snakeHead = this.snakeBody[0];
    return [this.posX, this.posY, this.snakeBody, this.snakeLength, this.snakeHead, this.rowLength];
  }
  move(direction, rowLength) {
    this.direction = direction;
    this.rowLength = rowLength;
    this.walls = this.closedWalls;
    this.flag = true;
    this.snakeBody = Array.from(document.querySelectorAll(".snake_body"));
    this.snakeHead = document.querySelector(".snake_head");
    if (!this.snake) {
      this.snake = Object.assign(this.snakeBody);
      this.snake.unshift(this.snakeHead);
    }
    this.snakeLength = this.snake.length;
    this.snakeCoordinates = [this.snakeHead.getAttribute("X"), this.snakeHead.getAttribute("Y")];
    this.snakeHead.classList.remove("snake_head");
    this.snakeHead.classList.add("snake_body");
    this.snake[this.snakeLength - 1].classList.remove("snake_body");
    this.snake.pop();
    this.x = this.snakeCoordinates[0];
    this.y = this.snakeCoordinates[1];
    if (this.direction == "up") {
      if (this.y < this.rowLength) {
        this.snake.unshift(document.querySelector('[X = "' + this.snakeCoordinates[0] + '"][Y = "' + (+this.snakeCoordinates[1] + 1) + '"]'));
      } else if (this.y == this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[1] = 0;
        this.snake.unshift(document.querySelector('[X = "' + this.snakeCoordinates[0] + '"][Y = "' + (+this.snakeCoordinates[1] + 1) + '"]'));
      }
    } else if (this.direction == "right") {
      if (this.x < this.rowLength) {
        this.snake.unshift(document.querySelector('[X = "' + (+this.snakeCoordinates[0] + 1) + '"][Y = "' + this.snakeCoordinates[1] + '"]'));
      } else if (this.x == this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[0] = 0;
        this.snake.unshift(document.querySelector('[X = "' + (+this.snakeCoordinates[0] + 1) + '"][Y = "' + this.snakeCoordinates[1] + '"]'));
      }
    } else if (this.direction == "down") {
      if (this.y > 1) {
        this.snake.unshift(document.querySelector('[X = "' + this.snakeCoordinates[0] + '"][Y = "' + (+this.snakeCoordinates[1] - 1) + '"]'));
      } else if (this.y < this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[1] = this.rowLength + 1;
        this.snake.unshift(document.querySelector('[X = "' + this.snakeCoordinates[0] + '"][Y = "' + (+this.snakeCoordinates[1] - 1) + '"]'));
      } /*  */
    } else if (this.direction == "left") {
      if (this.x > 1) {
        this.snake.unshift(document.querySelector('[X = "' + (+this.snakeCoordinates[0] - 1) + '"][Y = "' + this.snakeCoordinates[1] + '"]'));
      } else if (this.x < this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[0] = this.rowLength + 1;
        this.snake.unshift(document.querySelector('[X = "' + (+this.snakeCoordinates[0] - 1) + '"][Y = "' + this.snakeCoordinates[1] + '"]'));
      }
    }
    this.snake[0].classList.add("snake_head");

    /* =========== МЕХАНИЗМ СЪЪЕДАНИЯ ЕДЫ ================ */

    this.head = document.querySelector(".snake_head");
    this.headCoordinates = [Number(this.head.getAttribute("x")), Number(this.head.getAttribute("y"))];
    this.food = document.querySelector(".food");
    if (this.food) {
      this.coordinatesFood = [this.food.getAttribute("X"), this.food.getAttribute("Y")];
    }
    if (this.coordinatesFood[0] == this.headCoordinates[0] && this.coordinatesFood[1] == this.headCoordinates[1]) {
      this.food.classList.remove("food");
      this.a = this.snake[this.snakeLength - 1].getAttribute("X");
      this.b = this.snake[this.snakeLength - 1].getAttribute("Y");
      this.snakeLength++;
      this.snake.push(document.querySelector('[X="' + this.a + '"][Y="' + this.b + '"]'));
      this.foodModule.createFood(rowLength);
      this.scoreModule.increaseScore();
      this.scoreModule.rememberRecord();
      this.speed -= 5;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnakeModule);

/***/ }),

/***/ "./src/js/walls.js":
/*!*************************!*\
  !*** ./src/js/walls.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class WallsModule {
  constructor() {
    this.checkbox = document.querySelector(".teleport__checkbox");
    this.checkboxCheked = document.querySelector(".teleport__checkbox_checked");
  }
  closeWalls = () => {
    this.checkboxCheked.classList.toggle("teleport__checkbox_checked_visible");
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WallsModule);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ "./src/js/field.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button */ "./src/js/button.js");
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snake */ "./src/js/snake.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./food */ "./src/js/food.js");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./score */ "./src/js/score.js");
/* harmony import */ var _walls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./walls */ "./src/js/walls.js");






class Main {
  constructor() {
    this.fieldModule = new _field__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.sizeButtonModule = new _button__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.snakeModule = new _snake__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.foodModule = new _food__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.scoreModule = new _score__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.wallsModule = new _walls__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.scoreModule.rememberRecord();
    this.timerID;
    this.score = this.scoreModule.score;
    this.controlScore = 0;
    this.speed = this.snakeModule.speed;
    this.flag = false;
    this.direction = "up";
    this.rowLength = 10;
    this.restart = document.querySelector(".restart__button");
    this.restartTitle = document.querySelector(".restart__title");
    this.contr = 100;
    this.movingTimer;
    this.fieldModule.fieldSize(300, 300, 100);
    this.fieldModule.setCoordinates(100);
    this.snakeModule.generateSnake(10);
    this.foodModule.createFood(10);
    this.cells = document.querySelectorAll(".cell");
    this.sizeButtonModule.sizeButton.addEventListener("click", this.sizeButtonModule.showSizeList);
    document.addEventListener("click", this.sizeButtonModule.hideSizeList);
    this.sizeButtonModule.sizeListItem.forEach(this.sizeButtonModule.changeButtonText);
    this.sizeButtonModule.sizeListItem[0].addEventListener("click", () => {
      this.fieldModule.removeField();
      this.fieldModule.fieldSize(300, 300, 100);
      this.fieldModule.setCoordinates(100);
      this.snakeModule.generateSnake(10);
      this.foodModule.createFood(10);
      this.rowLength = 10;
      if (this.snakeModule.closedWalls % 2 == 0) {
        main.fieldModule.field.classList.add("field__bordered");
      }
    });
    this.sizeButtonModule.sizeListItem[1].addEventListener("click", () => {
      this.fieldModule.removeField();
      this.fieldModule.fieldSize(450, 450, 225);
      this.fieldModule.setCoordinates(225);
      this.snakeModule.generateSnake(15);
      this.foodModule.createFood(15);
      this.rowLength = 15;
      if (this.snakeModule.closedWalls % 2 == 0) {
        main.fieldModule.field.classList.add("field__bordered");
      }
    });
    this.sizeButtonModule.sizeListItem[2].addEventListener("click", () => {
      this.fieldModule.removeField();
      this.fieldModule.fieldSize(600, 600, 400);
      this.fieldModule.setCoordinates(400);
      this.snakeModule.generateSnake(20);
      this.foodModule.createFood(20);
      this.rowLength = 20;
      if (this.snakeModule.closedWalls % 2 == 0) {
        main.fieldModule.field.classList.add("field__bordered");
      }
      //this.wallsModule.checkboxCheked.classList.remove("teleport__checkbox_checked_visible");
    });

    this.wallsModule.checkbox.addEventListener("click", function () {
      if (main.flag == false) {
        main.wallsModule.closeWalls();
        main.fieldModule.field.classList.toggle("field__bordered");
      }
    });
  }
  move = () => {
    if (!document.querySelector(".restart").classList.contains("restart_visible")) {
      this.snakeModule.move(main.direction, main.rowLength);
    }
    if (this.snakeModule.y == this.snakeModule.rowLength && this.snakeModule.walls % 2 == 0 && this.snakeModule.direction == "up" || this.snakeModule.x == this.snakeModule.rowLength && this.snakeModule.walls % 2 == 0 && this.snakeModule.direction == "right" || this.snakeModule.y == 1 && this.snakeModule.walls % 2 == 0 && this.snakeModule.direction == "down" || this.snakeModule.x == 1 && this.snakeModule.walls % 2 == 0 && this.snakeModule.direction == "left") {
      main.end();
    }
    if (this.snakeModule.snake[0].classList.contains("snake_body") && this.snakeModule.snake[0].classList.contains("snake_head") || this.snakeModule.snakeLength == this.cells.length + 1) {
      main.end();
    }
  };
  increaseSpeed = () => {
    this.speed = this.snakeModule.speed;
    return this.speed;
  };
  checkScore = () => {
    this.score = +document.querySelector(".score__value").innerText;
    if (this.score > this.controlScore) {
      this.boostSnake();
      setTimeout(this.controlScore = this.score, 10);
    }
  };
  boostSnake = () => {
    clearInterval(this.timerID);
    this.timerID = setInterval(this.move, this.speed);
  };
  end = () => {
    console.log("the end");
    clearInterval(main.movingTimer);
    clearInterval(this.timerID);
    document.querySelector(".restart__score__value").innerText = document.querySelector(".score__value").innerText;
    document.querySelector(".restart__record__value").innerText = document.querySelector(".record__value").innerText;
    this.restartTitle.innerText = "Игра окончена :(";
    if (this.snakeModule.snakeLength == this.cells.length + 1) {
      this.restartTitle.innerText = "ПОБЕДА!";
    }
    document.querySelector(".restart").classList.add("restart_visible");
  };
  increaseContr = () => {
    if (this.contr > 0) {
      if (main.speed > 400) {
        this.contr -= 1.1;
      } else if (main.speed > 300) {
        this.contr -= 1.35;
      } else if (main.speed > 200) {
        this.contr -= 1.6;
      }
    } else {
      clearInterval(main.movingTimer);
    }
    return this.contr;
  };
}
let main = new Main();
window.addEventListener("keydown", function (e) {
  clearInterval(main.movingTimer);
  main.movingTimer = setInterval(main.increaseContr, 10);
  if ((e.keyCode == 37 || e.keyCode == 65) && main.direction !== "right" && main.contr < 50) {
    main.direction = "left";
    //console.log(main.direction);
    main.contr = 100;
  }
  if ((e.keyCode == 38 || e.keyCode == 87) && main.direction !== "down" && main.contr < 50) {
    main.direction = "up";
    //console.log(main.direction);
    main.contr = 100;
  }
  if ((e.keyCode == 39 || e.keyCode == 68) && main.direction !== "left" && main.contr < 50) {
    main.direction = "right";
    //console.log(main.direction);
    main.contr = 100;
  }
  if ((e.keyCode == 40 || e.keyCode == 83) && main.direction !== "up" && main.contr < 50) {
    main.direction = "down";
    //console.log(main.direction);
    main.contr = 100;
  }
  return main.direction;
});
window.addEventListener("keydown", function (e) {
  if ((e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83) && main.flag == false) {
    main.flag = true;
    main.timerID = setInterval(main.move, main.speed);
    main.sizeButtonModule.sizeButton.disabled = true;
    document.querySelector(".instruction").style.display = "none";
    return main.timerID;
  }
});
setInterval(main.increaseSpeed, 10);
setInterval(main.checkScore, 10);
main.restart.addEventListener("click", () => {
  location.reload();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map