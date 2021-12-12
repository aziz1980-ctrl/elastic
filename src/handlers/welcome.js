const fetch = require("node-fetch");
const client = require("../utils/elasticClient");
function welcome(request, response) {
  const pokObject = readAll();
  pokObject
    .then((data) => {
      let htmlData = "";
      data.forEach((pokemon) => {
        htmlData += `
      <div><a href='/search?name=${pokemon["_source"].Name}'>${pokemon["_source"].Name}</a></div>`;
      });

      response.end(htmlData);
    })
    .catch((error) =>
      console.log("Something went error please see the  error -> ", error)
    );
}

//as we know pokemon's id are between 1(gte) to 1088(lte) and we need at least 10 POKS that are dangerous,
//from testing before i saw that the pokemon's from APPENDIX A that are dangerous are
//less  than 20 and more than 10 so we make size 20
async function readAll() {
  try {
    const { body } = await client.search({
      index: "cymotive-pokemons",
      body: {
        query: {
          range: { Id: { gte: 1, lte: 1088 } },
        },
        size: 20,
      },
    });
    return body.hits.hits;
  } catch (error) {
    console.log("Something went wrong, please see the  error -> ", error);
  }
}

module.exports = welcome;
