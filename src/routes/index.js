const express = require("express");
const {
  getPokemons,
  getPokemon,
  downloadPokemon,
} = require("../controllers/pokemonController");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send(
    "<div style='display: flex; flex-flow: column; height: 100%; justify-content:center; text-align:center;'><h1>Welcome to the poke-back API</h1> <br> <p>Enjoy our API</p><div>"
  );
});

router.route("/pokemons").get(getPokemons);
router.route("/pokemon/:nameOrId").get(getPokemon);
router.route("/pokemon-download/:nameOrId").get(downloadPokemon);

module.exports = router;
