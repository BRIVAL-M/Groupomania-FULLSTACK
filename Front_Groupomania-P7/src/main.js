import { createApp } from 'vue'
import App from './App.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import News from './components/News.vue'



import {BootstrapVue3} from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import {createRouter,createWebHistory} from 'vue-router'

const routes = [
    { path: '/signup', component: Signup},
    { path: '/login', component: Login},
    { path: '/news', component: News},
]

const router = createRouter({ history: createWebHistory(),routes})

// si l'utilisateur va sur la page news il doit être connecté
// router.beforeEach((to, from, next) => {
//     if (to.path === '/news' && !localStorage.getItem('token')) {
//         next('/login')
//     }
// })


createApp(App).mount('#app')
const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
 


 app.mount('#app')


