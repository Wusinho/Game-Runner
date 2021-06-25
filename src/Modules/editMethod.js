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

function getLocal() {
  return JSON.parse(localStorage.getItem("save"));
}
function getStringLocal(){
  return localStorage.getItem("default");
}


export { editMethod, setLocalObject,getLocal,getStringLocal };
