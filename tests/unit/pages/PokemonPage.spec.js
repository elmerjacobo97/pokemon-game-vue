import {shallowMount} from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage.vue";
import {pokemons} from "../../mocks/pokemons.mock";

describe('PokemonPage component', function () {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage);
    })

    test('debe de hacer match con el snapshot', function() {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de llamar el mixPokemonArray al montar', function() {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
        const wrapper = shallowMount(PokemonPage);

        expect(mixPokemonArraySpy).toHaveBeenCalled();
    });

    test('debe de hacer match con el snapshot cuando cargan los pokemons', function() {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', function() {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        });

        const picture = wrapper.find('pokemon-picture-stub');
        const options = wrapper.find('pokemon-options-stub');

        expect(picture.exists()).toBeTruthy();
        expect(options.exists()).toBeTruthy();

        expect(picture.attributes('pokemonid')).toBe('1');
        expect(options.attributes('pokemons')).toBeTruthy();
    });

    test('pruebas con checkAnswer', async function() {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        });

        await wrapper.vm.checkAnswer(1);

        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBe(true);
        expect(wrapper.find('h2').text()).toBe(`Correcto ${pokemons[0].name}`)

        await wrapper.vm.checkAnswer(10);
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)
    });
});
