import views from "../views/scoreBoard.html"
import { getApi, setLocalObject, getLocal  } from "./editMethod";



export default async () => {
    const object = localStorage.getItem('Api')
  try{
    const response = await object
    const data = await response.json();
    console.log(data)

  }  catch (error) {
    console.log(error);
  }
  
  

    // const saveFilter =    obj.sort(function (a, b) {return b.score - a.score})
    
    // saveFilter.forEach(function (value, i) {
    //   console.log(value.user)

    //   const tableElement = document.getElementById('tbody')

    //   const trTag = document.createElement('tr')
    //   trTag.innerHTML =views
    //   tableElement.appendChild(trTag)
  
    //     const tdPlayer = document.getElementById('tdplayer')
    //     const tdScores = document.getElementById('tdscore')
    //     const rank = document.getElementById('rankPosition')
  
  
    //     tdPlayer.innerText = value.user
    //     tdPlayer.id = `${i}+`
    //     tdScores.innerText = value.score
    //     tdScores.id = `${i}-`
    //     rank.innerText = `${i+1}`
    //     rank.id = `${i}*`

    // })



  };
  

 