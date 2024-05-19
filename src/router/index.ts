import { createRouter, createWebHistory } from '@ionic/vue-router';
import { NavigationGuardNext, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../store';
import { toastController } from '@ionic/vue';
import HomePage from '../views/HomePage.vue';
import InventoryPage from '../views/InventoryPage.vue';
import ItemPage from '../views/ItemPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    meta: { requiresAuth: false },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryPage,
  },
  {
    path: '/item/', //add /:id to get the id of the item
    name: 'Item',
    component: ItemPage,
  },
  {
    path: '/register',
    meta: { requiresAuth: false },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/tabs',
    component: () => import('../views/TabsPage.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/food-entries',
      },
      {
        path: 'food-entries',
        name: 'food-entries',
        component: () => import('../views/tabs/FoodEntries.vue'),
      },
      //added for report tab underneath
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../views/tabs/Reports.vue'),
      },
      {
        path: 'browse',
        component: () => import('../views/Tab2Page.vue'),
      },
      {
        path: 'suggestions/v1',
        component: () => import('../views/Tab3Page.vue'),
      },
    ],
  },
  {
    path: '/edit-profile',
    meta: { requiresAuth: true },
    component: () => import('../views/EditProfile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log('Navigation Guard Triggered');
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  await checkAuthenticatedRoutes(next);
});

async function checkAuthenticatedRoutes(next: NavigationGuardNext) {
  const userStore = useUserStore();
  const toast = await toastController.create({
    message: 'You must be logged in to access this page.',
    duration: 2000,
    color: 'tertiary',
  });

  if (!userStore.getUser) {
    await toast.present();
    next('/login');
    return;
  }

  next();
}

export default router;
