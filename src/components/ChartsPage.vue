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
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15');
        const pokemonData = response.data.results;

        const pokemonNames = pokemonData.map((pokemon: any) => pokemon.name);
        const pokemonWeights = await Promise.all(
          pokemonData.map(async (pokemon: any) => {
            const res = await axios.get(pokemon.url);
            return res.data.weight;
          })
        );

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
