<template>
    <h2 v-if="!pokemon">Espere por favor...</h2>
    <!-- <div v-if="pokemon"> -->
    <div v-else>
        <h1>¿Quién es este Pokemon?</h1>

        <PokemonPicture
            :pokemonId="pokemon.id"
            :showPokemon="showPokemon"
        />

        <!-- Escuchar ese evento @selection="checkAnswer" -->
        <PokemonOptions
            :pokemons="pokemonArr"
            @selection="checkAnswer"
        />

        <!-- template es similar a un fragment -->
        <template v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button
                class="btn-new-game"
                type="button"
                @click="newGame"
            >Nuevo Juego</button>
        </template>
    </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
    name: 'PokemonPage',
    components: {
        PokemonOptions,
        PokemonPicture,
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions();

            // Generar un número aleatorio entre 0 y 3
            const rndInt = Math.floor(Math.random() * 4);
            this.pokemon = this.pokemonArr[rndInt];
        },
        checkAnswer(selectedId) {
            this.showPokemon = true;
            this.showAnswer = true;

            if (selectedId === this.pokemon.id) {
                this.message = `Correcto ${this.pokemon.name}`
            } else {
                this.message = `Oops, era ${this.pokemon.name}`
            }
        },
        newGame() {
            this.pokemonArr = []
            this.mixPokemonArray()
            this.showPokemon = false
            this.showAnswer = false
            this.pokemon = null
        }
    },
    mounted() {
        this.mixPokemonArray();
    }
}
</script>
