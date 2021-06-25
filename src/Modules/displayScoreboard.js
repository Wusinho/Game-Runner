/* eslint-disable */
import { editMethod, setLocalObject, getLocal  } from "./editMethod";



export default (name) => {
    const saveObject = getLocal('save')
    const saveFilter =    saveObject.sort(function (a, b) {return b.score - a.score})
    for (let i = 0; i < saveFilter.length; i++) {

      // if(saveFilter[i].user == name){
      //   if (i == 0 ) {
      //     // const first = saveFilter[i]
      //     // console.log(first)
      //     console.log(`${saveFilter[i].user} with  ${saveFilter[i].score} pts in ${i+1} place `)
      //     console.log(`${saveFilter[i+1].user} with  ${saveFilter[i+1].score} pts in ${i+1} place `)
      //     console.log(`${saveFilter[i+2].user} with  ${saveFilter[i+2].score} pts in ${i+2} place `)
      //   } else if(i == saveFilter.length-1){
      //     console.log(i)
      //     console.log(`${saveFilter[i-2].user} with  ${saveFilter[i-2].score} pts in ${i-2} place `)
      //     console.log(`${saveFilter[i-1].user} with  ${saveFilter[i-1].score} pts in ${i-1} place `)
      //     console.log(`${saveFilter[i].user} with  ${saveFilter[i].score} pts in ${i} place `)
      //   } else if( i != 0 && i != (saveFilter-1))
      //     console.log(i)

      //     console.log(`${saveFilter[i-1].user} with  ${saveFilter[i-1].score} pts in ${i-1} place `)
      //     console.log(`${saveFilter[i].user} with  ${saveFilter[i].score} pts in ${i} place `)
      //     console.log(`${saveFilter[i+1].user} with  ${saveFilter[i+1].score} pts in ${i+1} place `)
        
        
        
        
      // }
      
    }

  };
  
