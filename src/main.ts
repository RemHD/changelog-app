import './assets/main.css'
import './assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router/router'
import NavBar from './components/NavBar.component.vue'

import enMessages from './locales/en.json'
import frMessages from './locales/fr.json'

const messages = {
  en: enMessages, // Load English translations
  fr: frMessages, // Load French translations
}

const i18n = createI18n({
    locale: 'fr', // Set the default locale (French in this case)
    messages,
  })
  

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.component('NavBar', NavBar)

app.mount('#app')
