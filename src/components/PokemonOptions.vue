<template>
    <div class="options-container">
        <ul>
            <li
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                @click="$emit('selection', pokemon.id)"
            >
                {{ pokemon.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default  {
    props: {
      pokemons: {
          type: Array,
          required: true,
      }
    },
    name: 'PokemonOptions'
}
</script>

<style scoped>
/* Pokemon Options */
ul {
    list-style-type: none;
    margin: 20px 0 0 0;
    padding: 0;
}

li {
    background-color: black;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    padding: 15px;
    color: white;
    text-transform: capitalize;
}

li:hover {
    background-color: #1a1a1a;
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>
