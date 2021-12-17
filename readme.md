## What framwroks/extra than Node.js I use?
### elasticsearch - for connection upload and download data from cloud
### dotenv - to hide username, password and cloud ID
### node-fetch - to make the fetch request with pokemon API
nodemon - for easy workflow and not restart server after each change/save manually

## How i devided the solution/project?
### .env and package.json is in the top level
### Then all the other files in "src" folder
## "src" include:
> server.js that make the connect to port 7003 and keep listening
> router.js is the router include 3 routers:
> - 1- for showing the result(of the investigation) of what's on elastic - CYStore (amazon)
> - 2- Search?name=XXXXXXX To view the Pok details
> - 3- Load - without this one the data would not be on CYStore,
> this path rout call the handler investegation, that load data from "pokemon_name.js" that
> was copied from Appendix A in the exam sheet, and connect the PokeApi
> "https://pokeapi.co" and get from it all the types and moves for all of them,
> and later on make final list (it is end with 16 pokemon's) that answer the need
> > - One of the following types: [ELECTRIC, FIRE, PSYCHIC]
> > - AND One of the following moves: [Thunder Shock, Quick Attack, Electro Ball, Thunder Wave]

## Folders
> Folder 'utils' have one file that brings data from .env and make the connect (function) to elasticsearch.
> Folder 'handlers' have the three handlers to answer the router
> Folder 'data' have the list of pokemons was showed in Appendix A

### The task was done with almost only NODE.JS,
### with work with clear code,
### I tried my best to make readable names and to not repeat parts of code,

## please notice there is mistake in 3 names of pokemons
> - 1- "Farfetch" not exist instead should type "Farfetchd"
> - 2- "Nidoran (male)" should be "Nidoran-m"
> - 3- "Nidoran (female)" should be "Nidoran-f"
