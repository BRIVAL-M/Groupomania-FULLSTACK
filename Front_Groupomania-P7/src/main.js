import { createApp } from 'vue'
import App from './App.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import News from './components/News.vue'
import Edit from './components/Edit.vue'



import {BootstrapVue3} from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import {createRouter,createWebHistory} from 'vue-router'

const routes = [
    // { path: '/', component: News, beforeEnter: (to, from, next) => {
    //     if (isLoginRequired(to)) {
    //         next('/login')
    //     } else {
    //         next()
    //     }
    // } },
    //{ path: '/', component: Home },
    { path: '/signup', component: Signup},
    { path: '/login', component: Login},
    { path: '/news', component: News},
    {path: '/edit/:id', component: Edit},
]

const router = createRouter({ history: createWebHistory(),routes})

/////////////////////////////////////////////////////////////////////// A revoir ... :/ 
router.beforeEach((to, from) => {
    console.log("from:", from)
    console.log("to:", to)
    if (isLoginRequired(to)) {
       return router.push('/login')
    }
  
  
  
})
function isLoginRequired(to) {
    if(!isPrivatePage(to))return false
    if (!isTokenInCache()) return true
    if(!isTokenValid()) return true
    return false
}
 
function isPrivatePage(to) {
    const publicPages = ['/login', '/signup']
    return !publicPages.includes(to.path)
}
function isTokenInCache() {
    return localStorage.getItem('token') != null
}
function isTokenValid() {
    
    const token = localStorage.getItem('token')
    return token != null //&& jwt.verify(token, '9490588a-bf5b-4cac-91d8-8718a916597b') // a revoir ...
    
}





createApp(App).mount('#app')
const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
 


 app.mount('#app')


