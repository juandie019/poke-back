const pokemonService = require("../services/pokemonService");
const { isInteger, isNumeric } = require("../utils/typeValidator");

const getPokemons = async (req, res) => {
  const { page, limit, searchterm } = req.query;

  // page and limit can't be 19.30 | 10px | ' '
  if (page && (!isNumeric(page) || !isInteger(parseFloat(page))))
    return res.status(400).send("Page must be a integer value");

  if (limit && (!isNumeric(limit) || !isInteger(parseFloat(limit))))
    return res.status(400).send("Limit must be a integer value");

  try {
    const pokemons = await pokemonService.getPokemons(page, limit, searchterm);
    res.send(pokemons);
  } catch (error) {
    const { response } = error;
    const message = response?.data || error.code || "Server error";

    res.status(response?.status || 500).send(message);
  }
};

const getPokemon = async (req, res) => {
  const { nameOrId } = req.params;

  if (!nameOrId) return res.status(400).send("Name or pokemon ID is required");

  try {
    const pokemons = await pokemonService.getPokemon(nameOrId);
    res.send(pokemons);
  } catch ({ response }) {
    res.status(response?.status || 500).send(response.data || "Server error");
  }
};

module.exports = {
  getPokemons,
  getPokemon,
};
