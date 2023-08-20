const sectionDetail = document.getElementById("pokemonDetail")

function converterPokemonToDivs(pokemon){
    return `
    <div id="basicInfo" class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <div class="atributosEspeciais">
                <span class="atribute">HP: ${pokemon.hp}</span>
                <span class="atribute">Speed: ${pokemon.speed}</span>
                <span class="atribute">Altura: ${pokemon.height}</span>
                <span class="atribute">Peso: ${pokemon.weight}</span>
                <span class="atribute">Ataque: ${pokemon.attack}</span>
                <span class="atribute">Ataque Especial: ${pokemon.special_attack}</span>
                <span class="atribute">Defesa: ${pokemon.defense}</span>
                <span class="atribute">Defesa Especial: ${pokemon.special_defense}</span>
            </div>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </div>
    <div class="voltar" onclick="voltarPagina()">
        <button id="voltar">
            Voltar
        </button>
    </div>
     `
 }

function loadPokemon(pokeNumber){
    pokeApi.getPokemon(pokeNumber - 1, 1)
    .then((pokemon) => {
        sectionDetail.innerHTML = converterPokemonToDivs(pokemon[0])  
    })
} 

function voltarPagina(){
    window.location.href = `index.html`
}

const urlParams = new URLSearchParams(window.location.search);
loadPokemon(Number(urlParams.get('number')))

