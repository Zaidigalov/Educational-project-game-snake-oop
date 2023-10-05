class FoodModule {
  constructor() {}

  generateFood(rowLength) {
    this.posX = Math.ceil(Math.random() * rowLength);
    this.posY = Math.ceil(Math.random() * rowLength);

    return [this.posX, this.posY];
  }

  createFood(rowLength) {
    this.coordinatesFood = this.generateFood(rowLength);

    this.food = document.querySelector(
      '[X = "' + this.coordinatesFood[0] + '"][Y = "' + this.coordinatesFood[1] + '"]'
    );

    while (
      this.food.classList.contains("snake_body") ||
      this.food.classList.contains("snake_head")
    ) {
      this.coordinatesFood = this.generateFood(rowLength);
      this.food = document.querySelector(
        '[X = "' + this.coordinatesFood[0] + '"][Y = "' + this.coordinatesFood[1] + '"]'
      );
    }

    this.food.classList.add("food");
  }
}

export default FoodModule;
