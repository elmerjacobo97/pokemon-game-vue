import {shallowMount} from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture.vue";

describe('PokemonPicture component', function () {
    test('debe de hacer match con el snapshot', function() {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false,
            }
        });
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('debe de mostrar la imagen oculta y el pokemon 100', function() {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false,
            }
        });

        const [ img1, img2 ] = wrapper.findAll('img');

        expect(img1.exists()).toBeTruthy();
        expect(img2).toBe(undefined);
        expect(img1.classes('hidden-pokemon')).toBe(true);
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    });

    test('debe de mostrar el pokemon si showPokemon:true', function() {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true,
            }
        });

        const img1 = wrapper.find('img');

        expect(img1.exists()).toBeTruthy();
        expect(img1.classes('hidden-pokemon')).toBe(true);
        expect(img1.classes('fade-in')).toBe(false);
    });
});
