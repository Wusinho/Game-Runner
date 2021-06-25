import displayScoreboard from "./displayScoreboard"
import getData from "./getData"


export default function(getTable){

getData().then((data) => {
    displayScoreboard(data.result)
    getTable.className = 'table visble'

    });
}