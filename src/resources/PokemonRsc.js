class PokemonResource {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }

  getSprites() {
    const mainSprites = {
      backDefault: this.pokemon.sprites.back_default,
      backFemale: this.pokemon.sprites.back_female,
      backShiny: this.pokemon.sprites.back_shiny,
      backShinyFemale: this.pokemon.sprites.back_shiny_female,
      frontDefault: this.pokemon.sprites.front_default,
      frontFemale: this.pokemon.sprites.front_female,
      frontShiny: this.pokemon.sprites.front_shiny,
      frontShinyFemale: this.pokemon.sprites.front_shiny_female,
    };

    return mainSprites;
  }

  getSpritesList() {
    const sprites = this.getSprites();

    // sprites can contain nullable props. They are removed
    const spritesKeys = Object.keys(sprites).filter(
      (key) => sprites[key] !== null
    );
    return spritesKeys.map((k) => sprites[k]);
  }

  getPokemon() {
    return {
      id: this.pokemon.id,
      name: this.pokemon.name,
      height: this.pokemon.height,
      weight: this.pokemon.weight,
      spriteList: this.getSpritesList(),
      baseExperience: this.pokemon.base_experience,
      moves: this.pokemon.moves.map((m) => m.move.name),
      abilities: this.pokemon.abilities.map((a) => a.ability.name),
      image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${this.pokemon.id}.svg`,
    };
  }
}

module.exports = PokemonResource;
