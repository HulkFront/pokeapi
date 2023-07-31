<template>
  <component :is="currentComponent" />
</template>

<script>
import ChartsPage from '../components/ChartsPage.vue';
import Home from '../components/Home.vue';

export default {
  components: {
    Home,
    ChartsPage,
  },
  
  computed: {
    currentComponent() {
      switch (window.location.pathname) {
        case '/':
          return 'Home';
        case '/charts':
          return 'ChartsPage';
      }
    },
  },
};
</script>
