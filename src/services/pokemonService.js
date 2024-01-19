const pokeApi = require("../api/pokemonApi");
const PokemonResource = require("../resources/PokemonRsc");
const PokemonCollection = require("../resources/PokemonCollection");

const getPokemons = async (page = 0, limit = -1, searchterm) => {
  const offset = page * limit;
  const res = await pokeApi.get(`/pokemon?offset=${offset}&limit=${limit}`);

  const { results, next, previous, count } = res.data; // results only has pokemon name an fetch url
  const pokemonCollection = new PokemonCollection(results);

  pokemonCollection.filterByName(searchterm);
  pokemonCollection.orderByName();

  // we need to get pokemons with his full data
  const promises = pokemonCollection.pokemons.map(({ name }) => {
    return getPokemon(name);
  });

  const fullPokemons = await Promise.all(promises);
  pokemonCollection.setPokemons(fullPokemons);

  return pokemonCollection.getCollection(
    page,
    limit,
    count,
    next ? true : false,
    previous ? true : false
  );
};

const getPokemon = async (nameOrId) => {
  const res = await pokeApi.get(`/pokemon/${nameOrId}`);
  const pokemon = res.data;

  const pokemonResource = new PokemonResource(pokemon);
  return pokemonResource.getPokemon();
};

module.exports = {
  getPokemons,
  getPokemon,
};
