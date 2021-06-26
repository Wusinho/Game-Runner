
const key = 'eZdZerySXHfh0blWsUNx'
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;


const leaderboard = (() => {
  const addScore = async (obj) => {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body : obj,
    }); 

    if (response) getInfo()
  };


  const getInfo = async () => {
    const data = await fetch(url, { mode: 'cors' }).then((response) => response.json());

    localStorage.setItem('Api', JSON.stringify(data.result));
  };

  return {
    addScore,
    getInfo,
  };
})();


export default leaderboard;