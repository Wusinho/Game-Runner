export default class gameModel {
  constructor() {
    this._player;
    this._stars;
    this._platforms;
    this._cursors;
    this._score = 0;
    this._scoreText;
    this._gameOver = false;
    this._bombs;
  }

  set player(e) {
    this._player = e;
  }

  get player() {
    return this._player;
  }

  set stars(e) {
    this._stars = e;
  }

  get stars() {
    return this._stars;
  }

  set platforms(e) {
    this._platforms = e;
  }

  get platforms() {
    return this._platforms;
  }
  set cursors(e) {
    this._cursors = e;
  }

  get cursors() {
    return this._cursors;
  }
  set score(e) {
    this._score = e;
  }

  get score() {
    return this._score;
  }
  set scoreText(e) {
    this._scoreText = e;
  }

  get scoreText() {
    return this._scoreText;
  }
  set gameOver(e) {
    this._gameOver = e;
  }

  get gameOver() {
    return this._gameOver;
  }
  set bombs(e) {
    this._bombs = e;
  }

  get bombs() {
    return this._bombs;
  }
}
