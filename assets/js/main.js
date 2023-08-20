const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const limit = 10
let offset = 0
const maxPokemons = 151

function converterPokemonToLi(pokemon){
   return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

function loadPokemonItems(offset, limit){
    pokeApi.getPokemon(offset, limit)
    .then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(converterPokemonToLi).join('')     
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit

    if(qtdRecord >= maxPokemons){
        const newLimit = maxPokemons - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.remove()
    }
    else{
        loadPokemonItems(offset, limit)
    }

    
    
})
