<!-- App.vue -->
<template>
  <div>
    <header>
      <router-link to="/"></router-link>
      <router-link to="/charts"></router-link> <!-- Adicione o link para a página de gráficos -->
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import RouterView from './components/RouterView.vue';

</script>
