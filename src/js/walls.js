class WallsModule {
  constructor() {
    this.checkbox = document.querySelector(".teleport__checkbox");
    this.checkboxCheked = document.querySelector(".teleport__checkbox_checked");
  }

  closeWalls = () => {
    this.checkboxCheked.classList.toggle("teleport__checkbox_checked_visible");
  };
}

export default WallsModule;
