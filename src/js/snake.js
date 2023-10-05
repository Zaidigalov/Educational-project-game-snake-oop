import FoodModule from "./food";
import ScoreModule from "./score";
import WallsModule from "./walls";

class SnakeModule {
  constructor() {
    this.flag = false;
    this.speed = 500;
    this.foodModule = new FoodModule();
    this.scoreModule = new ScoreModule();
    this.wallsModule = new WallsModule();

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

    this.snakeBody = [
      document.querySelector('[X = "' + this.posX + '"][Y = "' + this.posY + '"]'),
      document.querySelector('[X = "' + this.posX + '"][Y = "' + (this.posY - 1) + '"]'),
    ];
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
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              this.snakeCoordinates[0] +
              '"][Y = "' +
              (+this.snakeCoordinates[1] + 1) +
              '"]'
          )
        );
      } else if (this.y == this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[1] = 0;
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              this.snakeCoordinates[0] +
              '"][Y = "' +
              (+this.snakeCoordinates[1] + 1) +
              '"]'
          )
        );
      }
    } else if (this.direction == "right") {
      if (this.x < this.rowLength) {
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              (+this.snakeCoordinates[0] + 1) +
              '"][Y = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        );
      } else if (this.x == this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[0] = 0;
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              (+this.snakeCoordinates[0] + 1) +
              '"][Y = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        );
      }
    } else if (this.direction == "down") {
      if (this.y > 1) {
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              this.snakeCoordinates[0] +
              '"][Y = "' +
              (+this.snakeCoordinates[1] - 1) +
              '"]'
          )
        );
      } else if (this.y < this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[1] = this.rowLength + 1;
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              this.snakeCoordinates[0] +
              '"][Y = "' +
              (+this.snakeCoordinates[1] - 1) +
              '"]'
          )
        );
      } /*  */
    } else if (this.direction == "left") {
      if (this.x > 1) {
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              (+this.snakeCoordinates[0] - 1) +
              '"][Y = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        );
      } else if (this.x < this.rowLength && this.walls % 2 !== 0) {
        this.snakeCoordinates[0] = this.rowLength + 1;
        this.snake.unshift(
          document.querySelector(
            '[X = "' +
              (+this.snakeCoordinates[0] - 1) +
              '"][Y = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        );
      }
    }

    this.snake[0].classList.add("snake_head");

    /* =========== МЕХАНИЗМ СЪЪЕДАНИЯ ЕДЫ ================ */

    this.head = document.querySelector(".snake_head");
    this.headCoordinates = [
      Number(this.head.getAttribute("x")),
      Number(this.head.getAttribute("y")),
    ];

    this.food = document.querySelector(".food");

    if (this.food) {
      this.coordinatesFood = [this.food.getAttribute("X"), this.food.getAttribute("Y")];
    }

    if (
      this.coordinatesFood[0] == this.headCoordinates[0] &&
      this.coordinatesFood[1] == this.headCoordinates[1]
    ) {
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

export default SnakeModule;
