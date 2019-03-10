import axios from 'axios'
import Store from '../store'

axios.defaults.baseURL = 'http://localhost:3000/api'

const HTTP = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    Authorization: `Bearer ${Store.getters.getAuthToken}`
  }
})

export default {
  register (params) {
    return axios.post('/register', params)
  },

  verify (params) {
    return axios.post('/verify', params)
  },

  login (params) {
    return axios.post('/login', params)
  },

  recover (params) {
    return axios.post('/recover', params)
  },

  resetPassword (token, params) {
    return axios.post('/reset/' + token, params)
  },

  updatePassword (params) {
    return axios.put('/password/update', params)
  },

  getUsers (params) {
    return axios.get('/users', params)
  },

  getUserById (id) {
    return axios.get(`/users/${id}`)
  },

  getUserByToken () {
    return HTTP.get('/users/token')
  },

  updateUserById (id, params) {
    return axios.post(`/users/${id}`, params)
  },

  updateAvatar (id, params) {
    return axios.post(`/users/${id}/avatar`, params)
  },

  sendInvite (params) {
    return HTTP.post('/invite', params)
  },

  createLeague (params) {
    return HTTP.post('/leagues', params)
  },

  getLeagues () {
    return HTTP.get('/leagues')
  },

  getLeague (id) {
    return HTTP.get(`/leagues/${id}`)
  },

  updateLeague (id, params) {
    return HTTP.put(`/leagues/${id}`, params)
  },

  deleteLeague (id) {
    return HTTP.delete(`/leagues/${id}`)
  },

  getTaxIndexes (leagueId) {
    return HTTP.get(`/leagues/${leagueId}/taxIndexes`)
  },

  getTaxIndexCompare (leagueId, params) {
    return HTTP.get(`/leagues/${leagueId}/compare`, { params })
  }
}
