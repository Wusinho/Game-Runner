import views from "../views/scoreBoard.html"
import { getApi, setLocalObject, getLocal  } from "./editMethod";



export default async (obj) => {
  const saveFilter = await obj

    const filterObj =    saveFilter.sort(function (a, b) {return b.score - a.score})
    
    
    filterObj.forEach(function (value, i) {

      if (i < 10) {
        const tableParent = document.getElementById('table')
      tableParent.className = ' table visible'
      const tableElement = document.getElementById('tbody')

      const trTag = document.createElement('tr')
      trTag.innerHTML =views
      tableElement.appendChild(trTag)
  
        const tdPlayer = document.getElementById('tdplayer')
        const tdScores = document.getElementById('tdscore')
        const rank = document.getElementById('rankPosition')
  
  
        tdPlayer.innerText = value.user
        tdPlayer.id = `${i}+`
        tdScores.innerText = value.score
        tdScores.id = `${i}-`
        rank.innerText = `${i+1}`
        rank.id = `${i}*`
      }
      

    })



  };
  

 