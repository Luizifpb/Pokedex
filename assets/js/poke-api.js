const pokeApi = {
    
    converterPokemonDetailToPokemon(pokeDetail){
        const pokemon = new Pokemon()
        pokemon.number = pokeDetail.id
        pokemon.name = pokeDetail.name

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types

        pokemon.types = types
        pokemon.type = type

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

        pokemon.hp = pokeDetail.stats[0].base_stat
        pokemon.speed = pokeDetail.stats[5].base_stat
        pokemon.height = pokeDetail.height
        pokemon.weight = pokeDetail.weight
        pokemon.attack = pokeDetail.stats[1].base_stat
        pokemon.defense = pokeDetail.stats[2].base_stat
        pokemon.special_attack = pokeDetail.stats[3].base_stat
        pokemon.special_defense = pokeDetail.stats[4].base_stat

        return pokemon
    }, 

    getPokemonsDetail: (pokemon) => {
        return fetch(pokemon.url)
            .then((response => response.json()))
            .then(pokeApi.converterPokemonDetailToPokemon)
    },
    
    getPokemon: (offset = 0, limit = 10) => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonsDetail(pokemon)))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
    }
}