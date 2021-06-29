import displayScoreboard from './displayScoreboard';

const key = 'eZdZerySXHfh0blWsUNx';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;

const leaderboard = (() => {
  const addScore = async (obj) => {
    await fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: obj,
    }).then((val) => (val)).catch((err) => (err));
  };

  const getInfo = async () => {
    const data = await fetch(url, { mode: 'cors' }).then((response) => response.json()).catch((err) => (err));

    displayScoreboard(data.result);
  };

  return {
    addScore,
    getInfo,
  };
})();

export default leaderboard;