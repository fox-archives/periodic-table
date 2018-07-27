import Api from '@/services/Api'

// post method in Axios module does post request to register inpoint in express server
export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

// // How to call from another file
// Authenticationervice.register({
//   email: 'name@example.com',
//   password: 'foo'
// })
