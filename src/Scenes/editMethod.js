/* eslint-disable */

export default (name, newDescription, property) => {
  let existing = localStorage.getItem(name);
  existing = existing ? JSON.parse(existing) : {};
  existing[property] = newDescription;

  localStorage.setItem(name, JSON.stringify(existing));
};
