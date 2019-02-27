import Vue from 'vue'
import Router from 'vue-router'
import Register from '../pages/Register'
import Verify from '../pages/Verify'
import Login from '../pages/Login'
import Recover from '../pages/Recover'
import Reset from '../pages/Reset'
import Settings from '../pages/Settings'
import InviteStaff from '../pages/InviteStaff'
import Home from '../pages/Home'
import Profile from '../pages/Profile'

// import Reports from '../pages/Reports'
import Account from '../pages/Account'
import Users from '../pages/Users'
import UsersEdit from '../pages/Users.Edit'
// import Applicants from '../pages/Applicants'
// import Applicant from '../pages/Applicant'
// import Buildings from '../pages/Buildings'
// import Building from '../pages/Building'
// import Components from '../pages/Components'
// import Listings from '../pages/Listings'
// import Listing from '../pages/Listing'
// import Tenants from '../pages/Tenants'
// import AddLease from '../pages/AddLease'
import fourohfour from '../pages/404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      meta: { layout: 'authentication' },
      component: fourohfour
    },
    {
      path: '/register',
      name: 'Register',
      meta: { layout: 'authentication' },
      component: Register
    },
    {
      path: '/verify/:token',
      name: 'verify',
      meta: { layout: 'authentication' },
      component: Verify
    },
    {
      path: '/login',
      name: 'Login',
      meta: { layout: 'authentication' },
      component: Login
    },
    {
      path: '/recover',
      name: 'Recover',
      meta: { layout: 'authentication' },
      component: Recover
    },
    {
      path: '/reset/:token',
      name: 'Reset',
      meta: { layout: 'authentication' },
      component: Reset
    },
    {
      path: '/admin/',
      name: 'Home',
      meta: { layout: 'application', requiresAuth: true },
      component: Home
    },
    {
      path: '/admin/users',
      name: 'Users',
      meta: { layout: 'application', requiresAuth: true },
      component: Users
    },
    {
      path: '/admin/users/new',
      name: 'InviteStaff',
      meta: { layout: 'application', requiresAuth: true },
      component: InviteStaff
    },
    {
      path: '/admin/users/:userId',
      name: 'UsersEdit',
      meta: { layout: 'application', requiresAuth: true },
      component: UsersEdit
    },
    {
      path: '/admin/Settings',
      name: 'Settings',
      meta: { layout: 'application', requiresAuth: true },
      component: Settings
    },
    {
      path: '/admin/Settings/Accounts',
      name: 'Accounts',
      meta: { layout: 'application', requiresAuth: true },
      component: Account
    },
    // {
    //   path: '/admin/Settings/Accounts/New',
    //   name: 'InviteStaff',
    //   meta: { layout: 'application', requiresAuth: true },
    //   component: InviteStaff
    // },
    {
      path: '/admin/Settings/Accounts/Profile',
      name: 'Profile',
      meta: { layout: 'application', requiresAuth: true },
      component: Profile
    }
  ]
})
