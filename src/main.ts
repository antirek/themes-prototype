import { createApp } from 'vue'
import App from './App.vue'

// Импорт стилей тем (включают шрифты)
import './themes/index.scss'

const app = createApp(App)
app.mount('#app')
