

var input = document.getElementById("pokeName");
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('btnBuscar').click();
        
        
    }
})


const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeinput =  pokeName.value.toLowerCase(); //132 //890 //pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeinput}`; //link del API
    fetch(url).then((res) => {//pregunta primero, para consultar la url| promesa = .then | se guarda la respuesta en un JSON | primera conexion, aun sigue siendo una promesa
        //console.log(res); //recibimos el status, pero todavia es una promesa
        
        if(res.status != "200"){
            console.log(res);
            pokeImage("img/noFoundImage.png")
            pokeShinyImage("img/noFoundImage.png")
        }
        else{
            
            return res.json();
        }
    }).then((data) => { // terminamos la promesa recolectando la data en una variable llamada data
        console.log(data);
        let pokeImg = data.sprites.front_default;
        let pokeImgShiny = data.sprites.front_shiny;
        let pName = data.species.name;
        let idPoke = `No°: ${data.id}`;
        //let typePoke = data.types[0].type.name
        
        const {stats, types} = data;
        const {moves} = data;

        console.log(pName);
        console.log(pokeImg);
        console.log(idPoke)
        console.log(types);
        console.log(stats);
        console.log(moves)
        //console.log(typePoke)
        //console.log(type2Poke)

        pokeImage(pokeImg);
        pokeShinyImage(pokeImgShiny);
        PokemonName(pName);
        pokemonID(idPoke);
        //PokemonType(typePoke);
        setCardColor(types)
        PokemonType(types)
        pokemonStats(stats)
        pokemonMoves(moves)

        
    })
    

}

//fetchPokemon();

const typeColors = {
    normal: '#a8a878',
    fire:   '#f08030',
    water:  '#6890f0',
    grass:  '#78c850',
    electric:'#f8d030',
    ice:    '#98d8d8',
    fighting:'#c03028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic:'#f85888',
    bug:    '#a8b820',
    rock:   '#b8a038',
    ghost:  '#705898',
    dark:   '#705848',
    dragon: '#7038f8',
    steel:  '#b8b8d0',
    fairy:  '#f0b6bc',
    default: 'black'
}

const setCardColor = types =>{
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.backgroundImage = `radial-gradient(${colorTwo} 30%, ${colorOne})`;
    pokeImg.style.border = `1px solid black`;
    shinyPokemon.style.backgroundImage = `radial-gradient(${colorTwo} 30%, ${colorOne})`;
    shinyPokemon.style.border = `1px solid black`;
    //pokeImg.style.backgroundSize = '5px 5px'
}

const PokemonName = (url) =>{
    const pName = document.getElementById("pName");
    pName.innerHTML = url;
    

}


const pokemonID = (url) =>{
    
    const idPoke = document.getElementById("idPokemon")
    idPoke.innerHTML = url;

}




const PokemonType = types => {
    const pokeTypes = document.querySelector('[data-poke-types]');
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.backgroundColor = typeColors[type.type.name];
        //typeTextElement.style.borderRadius = "20px"
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const pokemonStats = stats => {
    const pokeStats = document.querySelector('[data-poke-stats]');
    pokeStats.innerHTML = '';
    stats.forEach(stat =>{
        const statTextElement = document.createElement("div");
        const statTextName = document.createElement("div");
        const statTextAmount = document.createElement("div");
        statTextName.textContent = stat.stat.name;
        statTextAmount.textContent = stat.base_stat;
        statTextElement.appendChild(statTextName);
        statTextElement.appendChild(statTextAmount);
        pokeStats.appendChild(statTextElement)
    })
}
const pokemonMoves = moves =>{
    const pokeMoves = document.querySelector('[data-poke-moves]');
    pokeMoves.innerHTML = '';
    moves.forEach(move =>{
        const moveTextElement = document.createElement("div")
        moveTextElement.textContent = "- " + move.move.name + ".";
        pokeMoves.appendChild(moveTextElement);
    })
}


    


const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg"); //se obtiene el elemento src de html
    pokeImg.src = url; // Guarda la url para insertar en el src de la imagen   

}

const pokeShinyImage = (url) => {
    const shinyPokemon = document.getElementById("shinyPokemon");
    shinyPokemon.src = url;
}


//pokeImage("https://pokeapi.co/api/v2/pokemon/ditto");

/*
const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeinput = pokeName.value
    console.log("Texto input: " + pokeinput)
}
*/