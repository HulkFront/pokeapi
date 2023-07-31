import { createApp } from 'vue';
import App from './App.vue';

import RouterView from './components/RouterView.vue';

const app = createApp(App);

app.component('RouterView', RouterView);

app.mount('#app');
