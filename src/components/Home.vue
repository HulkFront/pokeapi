<template>
  <div class="home-container">
    <img class="poke-api" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"/>
    <h1>Pokémon List</h1>
    <div class="search-bar search-bar-fixed">
      <button class="charts-button" @click="goToChartsPage">Ir para Charts</button>
      <label>
        Pesquisar por:
        <select v-model="searchType" style="height: 34px;">
          <option value="name">Nome</option>
          <option value="id">ID</option>
        </select>
      </label>
      <input v-model="searchQuery" style="margin-left: 2px; height: 28px; width: 130px;" :placeholder="'Busque seu Pokemon'" />
      <button @click="searchPokemon" class="search-button" style="margin-left: 2px;">Pesquisar</button>
    </div>
    <div v-if="searchQuery">
    <ul v-if="filteredPokemons.length > 0" class="pokemon-list">
      <li v-for="pokemon in filteredPokemons" :key="pokemon.name" @click="selectPokemon(pokemon)">
        <img :src="pokemon.image" :alt="pokemon.name" />
        <span>{{ pokemon.name }}</span>
        <i class="arrow-icon">▼</i>
      </li>
    </ul>
    <p v-else>Nenhum Pokémon encontrado.</p>
    </div>

    <!-- Exibir os detalhes do Pokémon selecionado -->
     <div v-if="showModal" class="pokemon-details">
      <PokemonModal :pokemon="selectedPokemon" @close="closeModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import axios from 'axios';
import PokemonModal from './PokemonModal.vue';

interface Pokemon {
  name: string;
  image: string;
  id: number;
  height: number;
  weight: number;
  abilities: { name: string }[];
}

export default defineComponent({
  name: 'Home',
  components: {
    PokemonModal
  },
  setup() {
    const searchQuery = ref('');
    const searchType = ref('name');
    const pokemons: Pokemon[] = [];
    let selectedPokemon: Ref<Pokemon> = ref({ name: 'ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', id: 2, height: 10, weight: 130, abilities: [] });

    const showModal = ref(false);

    const closeModal = () => {
      showModal.value = false;
    };


    
    const filteredPokemons = ref<Pokemon[]>([]);
    const searchPokemon = () => {
      if (searchQuery.value.trim() === '') {
        // Caso a pesquisa esteja vazia, limpe os resultados
        filteredPokemons.value = [];
      } else {
        // Filtrar os pokémons com base na pesquisa atual
        const query = searchQuery.value.toLowerCase();
        filteredPokemons.value = pokemons.filter((pokemon) => {
          if (searchType.value === 'name') {
            // Filtrar os Pokémon cujo nome começa com a letra digitada (em ordem)
            return pokemon.name.toLowerCase().startsWith(query);
          } else {
            return pokemon.id === parseInt(query);
          }
        });
      }
    };

    const selectPokemon = (pokemon: Pokemon) => {
      selectedPokemon.value = pokemon;
      showModal.value = true; // Abrir a modal quando o Pokémon é selecionado

    };

    // Função para buscar todos os pokémons
    const fetchAllPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonData = response.data.results;

        // Limpar a lista de pokémons antes de adicionar os novos resultados
        pokemons.splice(0, pokemons.length);

        // Extrair os nomes e imagens dos Pokémon
        await Promise.all(
          pokemonData.map(async (pokemon: any) => {
            const res = await axios.get(pokemon.url);
            pokemons.push({
              name: pokemon.name,
              image: res.data.sprites.front_default,
              id: res.data.id,
              height: res.data.height,
              weight: res.data.weight,
              abilities: res.data.abilities.map((ability: any) => ({ name: ability.ability.name })),
            });
          })
        );
      } catch (error) {
        console.error('Erro ao buscar dados dos Pokémon:', error);
        // Limpar a lista de pokémons em caso de erro
        pokemons.splice(0, pokemons.length);
      }
    };
    

    // Buscar todos os pokémons inicialmente
    fetchAllPokemons();

    return {
      searchQuery,
      searchType,
      pokemons,
      filteredPokemons,
      selectedPokemon,
      selectPokemon,
      showModal,
      searchPokemon,
      closeModal,
    };
  },

  data() {
    return {
      selectedPokemon: null as Pokemon | null,
      // Certifique-se de que filteredPokemons está definido corretamente como uma lista vazia
      filteredPokemons: [] as Pokemon[],
    };
  },

  methods: {
    // Método para selecionar o Pokémon e exibir seus detalhes
    selectPokemon(pokemon: Pokemon) {
      // Atualizar o Pokémon selecionado apenas se o objeto for válido
      if (pokemon) {
        this.selectedPokemon = pokemon;
      }
    },

    goToChartsPage() {
      // Navegar para a página "/charts" usando o método window.location.href
      window.location.href = '/charts';
    },
  },
});
</script>

<style>
.charts-button {
  position: absolute;
  top: 10px;
  right: 12px;
  padding: 10px 10px;
  background-color: #e91e1e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  }
.search-button {
  padding: 10px 10px;
  background-color: #e91e1e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.poke-api {
  width: 300px;
  height: 150px;
}
.search-bar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
}
.home-container {
  background-color: #e1f5fe;
  min-height: 100vh;
  padding: 20px;
  display: flex; /* Usamos flexbox para alinhar o conteúdo horizontalmente */
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  flex-direction: column; /* Alinha o conteúdo em coluna para centralizar a barra de pesquisa acima */
}
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.pokemon-list {
  display: flex; /* Exibir os pokémons em uma linha horizontal */
  flex-wrap: wrap; /* Quebrar a linha quando não houver espaço na largura */
  justify-content: center; /* Centralizar os pokémons horizontalmente */
}

.pokemon-list > li {
  flex: 0 0 150px; /* Definir a largura de cada elemento na lista */
  margin: 10px; /* Espaçamento entre os pokémons */
  display: flex; /* Alinhar os itens verticalmente */
  align-items: center; /* Alinhar os itens verticalmente */
  cursor: pointer; /* Cursor muda para indicar que o item é clicável */
}

.pokemon-list img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer; /* Cursor muda para indicar que o item é clicável */
}

img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.arrow-icon {
  margin-left: 5px; /* Adicione um espaçamento entre o nome do Pokémon e o ícone */
  font-size: 14px; /* Ajuste o tamanho do ícone conforme necessário */
  color: rgb(34, 185, 72); /* Defina a cor do ícone */
}
</style>
