export default function(obj){

    const key = 'eZdZerySXHfh0blWsUNx'
    const url =
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
    
    var body = obj;
    
    fetch(url, {
      method: "POST", // or 'PUT'
      mode: 'cors',
      body: body, // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));



}

