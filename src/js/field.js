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

export default FieldModule;
