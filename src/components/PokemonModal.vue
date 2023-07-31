<template>
  <div class="modal-overlay" v-if="pokemon">
    <div class="modal-container">
      <div class="pokemon-card">
        <div class="pokemon-image">
          <img :src="pokemon.image" :alt="pokemon.name" />
        </div>
        <div class="pokemon-info">
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
          <div class="pokemon-attributes">
            <p><span class="attribute-label">Height:</span> {{ pokemon.height }}</p>
            <p><span class="attribute-label">Weight:</span> {{ pokemon.weight }}</p>
            <p><span class="attribute-label">Abilities:</span></p>
            <ul>
              <li v-for="ability in pokemon.abilities" :key="ability.name">
                {{ ability.name }}
              </li>
            </ul>
          </div>
          <button @click="closeModal" class="close-button">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Pokemon {
  name: string;
  image: string;
  id: number;
  height: number;
  weight: number;
  abilities: { name: string }[];
}

export default defineComponent({
  name: 'PokemonModal',
  props: {
    pokemon: {
      type: Object as PropType<Pokemon | null>,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
});
</script>

<style>
.close-button {
  padding: 10px 20px;
  background-color: #e91e1e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  }
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.modal-content {
  padding: 20px;
  text-align: center;
}
.modal-content img {
  width: 100px;
  height: 100px;
  margin: 10px auto;
}
.pokemon-card {
  display: flex;
  background-color: #f8d030;
  border-radius: 4px;
  border: 2px solid #ef5350;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
}
.pokemon-image {
  padding: 10px;
  flex: 0 0 150px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.pokemon-image img {
  width: 100%;
  height: auto;
}
.pokemon-info {
  padding: 10px;
}
.pokemon-name {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background-color: #ef5350;
  padding: 8px;
  border-radius: 8px;
}
.pokemon-attributes {
  margin-top: 10px;
}
.attribute-label {
  font-weight: bold;
  color: #333;
}
.pokemon-info p {
  margin: 5px 0;
  font-size: 16px;
}
.pokemon-info ul {
  list-style: none;
  padding: 0;
}
.pokemon-info li {
  font-size: 14px;
}
</style>
