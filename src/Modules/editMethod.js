/* eslint-disable */
import Score from "../Score"


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
  return JSON.parse(localStorage.getItem("default"));
}
function getStringLocal(){
  return localStorage.getItem("default");
}

function setDefaultName(){
  const defaultName = new Score();

  setLocalObject(defaultName);

}

export { editMethod, setLocalObject,getLocal,getStringLocal,setDefaultName };
