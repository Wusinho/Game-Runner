export default async function getData() {
    
    const url = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/eZdZerySXHfh0blWsUNx/scores/";
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }