const fetch = require("node-fetch");
const pokemon_names = require("../data/pokemon_names");
const url = require("url");

//this area will include only pokemons that are identify as DANGEROUS
const poksListJson = [];

//this 2 ares include the values that pokemon will be shown
//as dangerous one, if he at least have one value from each array
const typesArr = ["electric", "fire", "psychic"];
const movesArr = [
  "thunder-shock",
  "quick-attack",
  "electro-ball",
  "thunder-wave",
];

//checkData function is used for both moves check and types check
//for each pokemon after we get the data from POKEMON API
function checkData(checkList, pokList) {
  return checkList.some((type) => pokList.includes(type));
}

//this function will be called to get data of each pokemon (by name request from pokemon API)
//if the pokemon is on status dangerous then we will build a passport for it
// and arange it to be loud to CYStore
function investegatePok(request, response, pokName) {
  //api POK request by name
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokName.toLowerCase()}/`, {
    method: "GET",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      //here we test if he is dangerous
      if (
        checkData(
          typesArr,
          data.types.map((type) => type.type.name)
        ) &&
        checkData(
          movesArr,
          data.moves.map((move) => move.move.name)
        )
      ) {
        //here we create the passport if the pokemon answer the dangerous criterias
        return {
          Id: data.id,
          Name: data.name,
          "Base experience": data.base_experience,
          Height: data.height,
          "Type names": data.types.map((type) => type.type.name),
          "Move names": data.moves.map((move) => move.move.name),
        };
      }
    })
    .catch((error) => {
      console.log("Something went wrong, please see the  error -> ", error);
    });
}

function investegation(request, response) {
  Promise.all(
    pokemon_names.map((pokName) => investegatePok(request, response, pokName))
  )
    .then((result) => {
      //we make filter to get only pokemon's that are dangerous and have already passport
      run(result.filter((passport) => passport)).catch(console.log);
      //next line is only to view on localhost page and not stucl the response of the server
      //readonly view
      response.end(JSON.stringify(result.filter((passport) => passport)));
    })
    .catch((error) => {
      console.log("Something went wrong, please see the  error -> ", error);
    });
}

//run function will load the data to CYStore
async function run(promises) {
  try {
    await Promise.all(
      promises.map(async (promise) => {
        return client.index({
          index: "cymotive-pokemons",
          body: promise,
        });
      })
    );

    await client.indices.refresh({ index: "cymotive-pokemons" });
  } catch (error) {
    console.log("Something went wrong, please see the  error -> ", error);
  }
}

module.exports = investegation;
