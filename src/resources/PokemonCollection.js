class PokemonCollection {
  constructor(pokemons, convertToResource = false) {
    this.pokemons = pokemons;
  }

  setPokemons(pokemons) {
    this.pokemons = pokemons;
  }

  filterByName(filter) {
    if (filter) {
      this.pokemons = this.pokemons.filter(
        ({ name }) => name.includes(filter) || filter.includes(name)
      );
    }
  }

  orderByName(asc = true) {
    const ascOrd = (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
    const descOrd = (a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0);

    this.pokemons.sort((a, b) => (asc ? ascOrd(a, b) : descOrd(a, b)));
  }

  getCollection(
    page = 0,
    limit = 0,
    count = 0,
    next = false,
    previous = false
  ) {
    return {
      pagination: {
        next,
        previous,
        count,
        page: parseInt(page),
        limit: parseInt(limit),
      },

      pokemons: this.pokemons,
    };
  }
}

module.exports = PokemonCollection;
