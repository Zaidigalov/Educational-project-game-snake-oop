import FieldModule from "./field";
import SizeButtonModule from "./button";
import SnakeModule from "./snake";
import FoodModule from "./food";
import ScoreModule from "./score";
import WallsModule from "./walls";

export default class Main {
  constructor() {
    this.fieldModule = new FieldModule();
    this.sizeButtonModule = new SizeButtonModule();
    this.snakeModule = new SnakeModule();
    this.foodModule = new FoodModule();
    this.scoreModule = new ScoreModule();
    this.wallsModule = new WallsModule();

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

    if (
      (this.snakeModule.y == this.snakeModule.rowLength &&
        this.snakeModule.walls % 2 == 0 &&
        this.snakeModule.direction == "up") ||
      (this.snakeModule.x == this.snakeModule.rowLength &&
        this.snakeModule.walls % 2 == 0 &&
        this.snakeModule.direction == "right") ||
      (this.snakeModule.y == 1 &&
        this.snakeModule.walls % 2 == 0 &&
        this.snakeModule.direction == "down") ||
      (this.snakeModule.x == 1 &&
        this.snakeModule.walls % 2 == 0 &&
        this.snakeModule.direction == "left")
    ) {
      main.end();
    }

    if (
      (this.snakeModule.snake[0].classList.contains("snake_body") &&
        this.snakeModule.snake[0].classList.contains("snake_head")) ||
      this.snakeModule.snakeLength == this.cells.length + 1
    ) {
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
      setTimeout((this.controlScore = this.score), 10);
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
    document.querySelector(".restart__score__value").innerText =
      document.querySelector(".score__value").innerText;
    document.querySelector(".restart__record__value").innerText =
      document.querySelector(".record__value").innerText;
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
  if (
    (e.keyCode == 37 ||
      e.keyCode == 38 ||
      e.keyCode == 39 ||
      e.keyCode == 40 ||
      e.keyCode == 65 ||
      e.keyCode == 87 ||
      e.keyCode == 68 ||
      e.keyCode == 83) &&
    main.flag == false
  ) {
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
