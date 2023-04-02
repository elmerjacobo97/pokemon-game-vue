import pokemonApi from "@/api/pokemonApi";

describe('pokemonApi', function() {
    test('axios debe de estar configurado con el api de pokemon', function() {
        // console.log(pokemonApi)
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
    });
});
