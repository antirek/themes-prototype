import { createApp } from 'vue';
import App from './App.vue';

// Импортируем компоненты из нашего пакета
import { CardHeader, CardBody, CardFooter, CardWithTheme, applyTheme } from '../dist/index.es.js';

// Импортируем CSS темы
import '../dist/themes/style.css';

const app = createApp(App);

// Регистрируем компоненты глобально
app.component('CardHeader', CardHeader);
app.component('CardBody', CardBody);
app.component('CardFooter', CardFooter);
app.component('CardWithTheme', CardWithTheme);

// Применяем светлую тему по умолчанию
applyTheme('light');

app.mount('#app');
