import pokemonApi from "@/api/pokemonApi";

const getPokemons = () => {
    const pokemonsArr = Array.from(Array(650));
    return pokemonsArr.map((_, index) => index + 1);
}

const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

    // retornar los pokemons
    return await getPokemonNames(mixedPokemons.splice(0, 4));
}

const getPokemonNames = async ([p1, p2, p3, p4] = []) => { // extraer los 4 pokemons aleatorios
    const promiseArr = [
        await pokemonApi.get(`/${ p1 }`),
        await pokemonApi.get(`/${ p2 }`),
        await pokemonApi.get(`/${ p3 }`),
        await pokemonApi.get(`/${ p4 }`),
    ];

    const [resp1, resp2, resp3, resp4] = await Promise.all(promiseArr);
    return [
        { name: resp1.data.name, id: resp1.data.id },
        { name: resp2.data.name, id: resp2.data.id },
        { name: resp3.data.name, id: resp3.data.id },
        { name: resp4.data.name, id: resp4.data.id },
    ]
}


export default getPokemonOptions;
