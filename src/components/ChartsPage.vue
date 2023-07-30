<!-- ChartsPage.vue -->
<template>
  <div class="home-container">
    <h1>Pokémon Weights Chart</h1>
    <button class="charts-button" @click="goToChartsPage">Ir para Home</button>
    <div class="chart-container">
      <canvas ref="chartCanvas" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default defineComponent({
  name: 'ChartsPage',
  setup() {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);

    onMounted(async () => {
      try {
        // Obter os dados dos três primeiros Pokémon da API
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15');
        const pokemonData = response.data.results;

        // Extrair os nomes e pesos dos Pokémon
        const pokemonNames = pokemonData.map((pokemon: any) => pokemon.name);
        const pokemonWeights = await Promise.all(
          pokemonData.map(async (pokemon: any) => {
            const res = await axios.get(pokemon.url);
            return res.data.weight;
          })
        );

        // Criar o gráfico usando o Chart.js
        if (chartCanvas.value) {
          new Chart(chartCanvas.value, {
            type: 'bar',
            data: {
              labels: pokemonNames,
              datasets: [
                {
                  label: 'Peso dos Pokémons',
                  data: pokemonWeights,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos Pokémon:', error);
      }
    });

    return {
      chartCanvas,
    };
  },

  methods: {
      goToChartsPage() {
      // Navegar para a página "/charts" usando o método window.location.href
      window.location.href = '/';
    },
  }
});
</script>

<style>
.home-container {
  background-color: #e1f5fe;
  min-height: 100vh;
  padding: 20px;
  display: flex; /* Usamos flexbox para alinhar o conteúdo horizontalmente */
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  flex-direction: column; /* Alinha o conteúdo em coluna para centralizar a barra de pesquisa acima */
}
.chart-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
canvas {
  width: 100%;
  margin: 0 auto;
}
</style>
