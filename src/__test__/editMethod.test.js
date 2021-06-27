import { editMethod, setLocalObject,getLocal,getStringLocal,setDefaultName,getApi } from "../Modules/editMethod"
import Score from "../Score"


const object = new Score()




it("edits and existing value in localStorage", () => {
    setLocalObject(object);
    const getLocal = localStorage.getItem('default')
    expect(getLocal).toMatchObject(object);
  });