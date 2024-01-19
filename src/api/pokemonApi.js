const axios = require("axios");
const { pokemonApi } = require("../config");

const api = axios.create({
  baseURL: pokemonApi,
  timeout: 20000,
});

module.exports = api;
