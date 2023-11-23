import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachForm from './pages/coaches/CoachForm.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import Requests from './pages/requests/Requests.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachForm },
    { path: '/requests', component: Requests },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
