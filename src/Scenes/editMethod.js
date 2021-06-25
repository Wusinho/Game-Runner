/* eslint-disable */

function editMethod(name, newDescription, property) {
  let existing = localStorage.getItem(name);
  existing = existing ? JSON.parse(existing) : {};
  existing[property] = newDescription;

  localStorage.setItem(name, JSON.stringify(existing));
}

function setLocalObject(value) {
  localStorage.setItem("default", JSON.stringify(value));
}

export { editMethod, setLocalObject };
