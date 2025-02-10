import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Auth from '../views/Auth.vue';
import Dashboard from '../views/Dashboard.vue';
import HomeView from '@/views/HomeView.vue';
import ReplyView from '@/views/ReplyView.vue';
import NewMessage from '@/views/NewMessage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: HomeView },
    { path: '/new-message', component: NewMessage },
    { path: '/reply', component: ReplyView },
    { path: '/auth', component: Auth },
    { 
      path: '/dashboard', 
      component: Dashboard, 
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) next('/login');
        else next();
      }
    }
  ],
});

export default router;
