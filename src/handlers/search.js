const fetch = require("node-fetch");
const client = require("../utils/elasticClient");
const url = require("url");

function search(request, response) {
  //the path that get this handler is /search?name=VALUE
  //in the follow const queryName we need the value to send to CYStore get request
  const queryName = url.parse(request.url, true).query.name;
  let htmlData;
  const pokObject = read(queryName);
  pokObject
    .then((data) => {
      let htmlData = `
      <div>Pokemon Name - ${data[0]["_source"].Name}</div>
      <div>Pokemon Id - ${data[0]["_source"].Id}</div>
      <div>Pokemon Height - ${data[0]["_source"].Height}</div>
      <div>Pokemon Base experience - ${data[0]["_source"]["Base experience"]}</div>
      <div>Pokemon Types - ${data[0]["_source"]["Type names"]}</div>
      <div>Pokemon Moves - ${data[0]["_source"]["Move names"]}</div>
     `;
      response.end(htmlData);
    })
    .catch((error) =>
      console.log("Something went wrong, please see the  error -> ", error)
    );
}

//read function is to read pokemon data from CYStore by name (by the index of the data equla "cymotive-pokemons")
async function read(pokName) {
  try {
    const { body } = await client.search({
      index: "cymotive-pokemons",
      body: {
        query: {
          match: { Name: pokName },
        },
      },
    });
    return body.hits.hits;
  } catch (error) {
    console.log("Something went wrong, please see the  error -> ", error);
  }
}

module.exports = search;
