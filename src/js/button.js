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

export default SizeButtonModule;
