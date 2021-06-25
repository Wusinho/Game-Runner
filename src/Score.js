export default class Score {
  constructor() {
    this._gameScore = 0;
  }

  set gameScore(value) {
    this._gameScore = value;
  }

  get gameScore() {
    return this._gameScore;
  }
}
