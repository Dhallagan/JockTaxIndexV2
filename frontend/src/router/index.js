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
import Account from '../pages/Account'
import Users from '../pages/Users'
import UsersEdit from '../pages/Users.Edit'
import Leagues from '../pages/Leagues'
import LeaguesEdit from '../pages/Leagues.Edit'
import LeaguesNew from '../pages/Leagues.New'
import TaxCompare from '../pages/TaxCompare'

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
      path: '/',
      redirect: { name: 'Login' }
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
    },
    {
      path: '/admin/Leagues/',
      name: 'Leagues',
      meta: {
        layout: 'application',
        requiresAuth: true
      },
      component: Leagues
    },
    {
      path: '/admin/Leagues/new',
      name: 'NewLeague',
      meta: {
        layout: 'application',
        requiresAuth: true
      },
      component: LeaguesNew
    },
    {
      path: '/admin/Leagues/:league_id',
      name: 'EditLeague',
      meta: {
        layout: 'application',
        requiresAuth: true
      },
      component: LeaguesEdit
    },
    {
      path: '/app/league/:league_id/compare',
      name: 'TaxCompare',
      meta: {
        layout: 'application',
        requiresAuth: true
      },
      component: TaxCompare
    }
  ]
})
