<!-- RouterView.vue -->
<template>
  <component :is="currentComponent" />
</template>

<script>
import ChartsPage from '../components/ChartsPage.vue'; // Importe o componente ChartsPage
import Home from '../components/Home.vue'; // Importe o componente ChartsPage


export default {
  components: {
    Home,
    ChartsPage, // Registre o componente ChartsPage
  },
  computed: {
    currentComponent() {
      switch (window.location.pathname) {
        case '/':
          return 'Home';
        case '/charts': // Adicione a rota para ChartsPage
          return 'ChartsPage';
      }
    },
  },
};
</script>
