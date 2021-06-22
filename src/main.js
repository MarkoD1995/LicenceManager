import { createApp } from 'vue';
import Leaderboard from './components/Leaderboard.vue';
import App from './App.vue';

const app = createApp(App);

app.component('Leaderboard', Leaderboard);
app.mount('#app');
