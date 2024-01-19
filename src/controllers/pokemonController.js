const PDFDocument = require("pdfkit");

const pokemonService = require("../services/pokemonService");
const imageService = require("../services/imageService");

const { isInteger, isNumeric } = require("../utils/typeValidator");
const { getPdfHead } = require("../utils/pdfHead");

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
    const pokemon = await pokemonService.getPokemon(nameOrId);
    res.send(pokemon);
  } catch ({ response }) {
    res.status(response?.status || 500).send(response?.data || "Server error");
  }
};

const downloadPokemon = async (req, res) => {
  const { nameOrId } = req.params;
  if (!nameOrId) return res.status(400).send("Name or pokemon ID is required");

  try {
    const pokemon = await pokemonService.getPokemon(nameOrId);
    const myDoc = new PDFDocument({ bufferPages: true });
    const buffers = [];

    myDoc.on("data", buffers.push.bind(buffers));
    myDoc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, getPdfHead(Buffer.byteLength(pdfData), pokemon.name))
        .end(pdfData);
    });

    myDoc.font("Times-Roman").fontSize(24).text(pokemon.name);

    const pokemonImage = await imageService.fetchImage(pokemon.spriteList[0]);
    myDoc.image(pokemonImage);

    myDoc.fontSize(12).text(`Weight: ${pokemon.weight} kg`);
    myDoc.fontSize(12).text(`Height: ${pokemon.weight} mts`);

    myDoc.end();
  } catch ({ response }) {
    res.status(response?.status || 500).send(response?.data || "Server error");
  }
};

module.exports = {
  getPokemons,
  getPokemon,
  downloadPokemon,
};
