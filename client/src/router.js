import Vue from 'vue'
import Router from 'vue-router'
import Signup from './views/Signup.vue';
import Signin from './views/Signin.vue';
import Dashboard from './views/Dashboard.vue';
import PathNotFound from './views/PathNotFound.vue';

Vue.use(Router)

function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next(`/${localStorage.userId}/dashboard`);
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  console.log(to)

  if (localStorage.token) {
    if (to.params.userId && to.params.userId !== localStorage.userId) {
      next({ name: 'dashboard', params: { userId: localStorage.userId, error: 404 } })
    } else { next() }


  } else {
    next('/signin');
  }
}

function checkValidUrl(to, from, next) {

}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: Signup,
    //   beforeEnter: loggedInRedirectDashboard,
    // },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      beforeEnter: loggedInRedirectDashboard,
    },
    {
      path: '/:userId/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: isLoggedIn,
    },
    {
      path: '*',
      // component: PathNotFound,
      redirect: { name: 'dashboard' }
    },
  ]
})
