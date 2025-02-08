import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import ManagerLayout from '../layouts/ManagerLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';
import Home from '../views/HomePages/HomeView.vue';
import Login from '../views/Auth/LoginView.vue';
import ForgotPassword from '../views/Auth/ForgotPasswordView.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import ManagerDashboard from '../views/Manager/ManagerDashboard.vue';
import ManagerInformation from '../views/Manager/ManagerInformation.vue';
import ManagerProfile from '../views/Manager/ManagerProfile.vue';
import FetchCrops from '../views/Manager/ManagerFetchCrops.vue';
import ManagerPassword from '../views/Manager/ManagerPassword.vue';
import ManagerUpdateInfo from '../views/Manager/ManagerUpdateInfo.vue';
import ManagerResetCodePassword from '../views/Auth/CodeToResetPassword.vue';
import ManagerResetPassword from '../views/Auth/ResetPassword.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: DefaultLayout },
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: DefaultLayout },
  },

  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { layout: DefaultLayout },
  },

  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { layout: AdminLayout , requiresAuth : true},
  },
  {
    path: '/Manager/dashboard',
    name: 'ManagerDashboard',
    component: ManagerDashboard,
    meta: { layout: ManagerLayout , requiresAuth : true,pageTitle: "Dashboard" },
  },

  {
    path: '/Manager/information',
    name: 'ManagerInformation',
    component: ManagerInformation,
    meta: { 
      layout: ManagerLayout  , 
      requiresAuth : true
      ,pageTitle: "Information" },
  },

  {
    path: '/Manager/profile',
    name: 'ManagerProfile',
    component: ManagerProfile,
    meta: { 
      layout: ManagerLayout  ,
      requiresAuth : true,
      pageTitle: "Profile" },
  },

  {
    path: '/Manager/fetch_crops',
    name: 'FetchCrops',
    component: FetchCrops,
    meta: { 
      layout: ManagerLayout  ,
      requiresAuth : true,
      pageTitle: "display crop's dataset" },
  },
  {
    path: '/Manager/updateInfo',
    name: 'UpdateInfo',
    component: ManagerUpdateInfo,
    meta: { 
      layout: ManagerLayout  ,
      requiresAuth : true,
      pageTitle: "Update_info" },
  },

  {
    path: '/Manager/password',
    name: 'Password',
    component: ManagerPassword,
    meta: { 
      layout: ManagerLayout  ,
      requiresAuth : true,
      pageTitle: "Password" },
  },

  {
    path: '/Manager/reset/code/password',
    name: 'ResetCodePassword',
    component: ManagerResetCodePassword,
    meta: { layout: GuestLayout },
  },

  {
    path: '/Manager/reset/password',
    name: 'ResetPassword',
    component: ManagerResetPassword,
    meta: { layout: GuestLayout },
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
