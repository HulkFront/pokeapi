import { createApp } from 'vue';
import App from './App.vue';

// 1. Importe o componente RouterView
import RouterView from './components/RouterView.vue';

// 2. Crie um novo aplicativo Vue
const app = createApp(App);

// 3. Registre o componente RouterView globalmente
app.component('RouterView', RouterView);

// 4. Monte o aplicativo no elemento raiz do DOM
app.mount('#app');
