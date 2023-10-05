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

export default ScoreModule;
