import Score from '../Score';

const editMethod = (name, newDescription, property) => {
  if (name && newDescription && property) {
    let existing = localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : {};
    existing[property] = newDescription;

    localStorage.setItem(name, JSON.stringify(existing));
  }
};

const setLocalObject = (value) => {
  if (value) localStorage.setItem('default', JSON.stringify(value));
};

const getLocal = () => JSON.parse(localStorage.getItem('default'));

const getStringLocal = () => localStorage.getItem('default');

const setDefaultName = () => {
  const defaultName = new Score();
  setLocalObject(defaultName);
};

export {
  editMethod, setLocalObject, getLocal, getStringLocal, setDefaultName,
};
