import {
  editMethod, setLocalObject, getLocal, setDefaultName, getApi,
} from '../Modules/editMethod';
import Score from '../Score';
import leaderboard from '../Modules/apiScore';

const object = new Score();

test("getLocal method if 'default' doesn't exist", () => {
  const lolcalParse = getLocal();

  expect(lolcalParse).toBe(undefined);
});

test("Api method if 'default' doesn't exist", () => {
  const lolcalParse = getApi();

  expect(lolcalParse).toBe(undefined);
});

test("editMethod method if 'default' doesn't exist", () => {
  const localEdit = editMethod();

  expect(localEdit).toBe(undefined);
});

test("setLocalObject saves information in 'default' key when a value is passed", () => {
  setLocalObject(object);
  const getObjectName = object.user;
  const getLocal = localStorage.getItem('default');
  expect(getLocal).toBe(`{"user":"${getObjectName}","score":0}`);
});

test('setLocalObject is passed with no value', () => {
  const setLolcaObj = setLocalObject();

  expect(setLolcaObj).toBe(undefined);
});

test("getLocal returns 'default' key from localStorage as an object", () => {
  setLocalObject(object);
  const lolcalParse = getLocal();
  const getObjectName = object.user;

  const getisObj = typeof lolcalParse;

  expect(lolcalParse.user).toBe(getObjectName);
  expect(lolcalParse.score).toBe(0);
  expect(getisObj).toBe('object');
});

test('getApi returns an Object', () => {
  leaderboard.addScore({ user: 'Guess7896', score: 0 });

  const getApiValues = getApi();

  const getisObj = typeof getApiValues;

  expect(getisObj).toBe('object');
});

test('setDefaultName saves a new guess user into localstorage', () => {
  setDefaultName();

  const getName = localStorage.getItem('default');
  const toJSON = JSON.parse(getName);

  expect(toJSON.user).toBeDefined();
  expect(toJSON.score).toBe(0);
});

test('editMethod edits information from localstorage, from default value 0 to 666', () => {
  setDefaultName();
  const toJSON = JSON.parse(localStorage.getItem('default'));

  expect(toJSON.score).toBe(0);

  editMethod('default', '666', 'score');

  const changedValue = localStorage.getItem('default');
  const defaulToJson = JSON.parse(changedValue);

  expect(defaulToJson.score).toBe('666');
});
