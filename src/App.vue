<template>
  <div>
    <header>
      <router-link to="/"></router-link>
      <router-link to="/charts"></router-link>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import RouterView from './components/RouterView.vue';

</script>
