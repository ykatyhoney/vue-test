import Vue from 'vue'
import Router from 'vue-router'
import Signup from './views/Signup.vue';
import Signin from './views/Signin.vue';
import Dashboard from './views/Dashboard.vue';
import Stats from './views/Stats.vue';
import Allocated from './views/Allocated.vue';
import { authenticationService } from "./_services/authentication.service";
import Role from './_helpers/role'
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

export const router = new Router({
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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { authorize: [] }
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
      meta: { authorize: [Role.MEMBER] }
    },
    {
      path: '/allocated',
      name: 'allocated',
      component: Allocated,
      meta: { authorize: [Role.AUDITOR] }
    },
    {
      path: '*',
      // component: PathNotFound,
      redirect: { name: 'dashboard' }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/signin", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: "/" });
    }
  } else {
    if (to.name === 'signin' && currentUser) {
      return next({ name: 'dashboard' })
    }
  }


  next();
});