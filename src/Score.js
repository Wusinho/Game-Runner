import createName from "./Modules/createName"

export default class Score {
  constructor(user, score) {
    this.user = user || createName();
    this.score = score || 0;
  }
}
