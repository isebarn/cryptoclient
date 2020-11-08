async function userRegister (app, user) {
  const response = await app.$axios.post('users', user)
  return response
}

async function userLogin (app, username, password) {
  try {
    await app.$auth.loginWith('local', {
      data: {
        Username: username,
        Password: password
      }
    })
    return true
  } catch (e) {
    console.log(e.response.data.message)
    app.error = e.response.data.message
  }

  return false
}

export default ({ app, store }, inject) => {
  inject('userRegister', (user) => { return userRegister(app, user) })
  inject('userLogin', (username, password) => { return userLogin(app, username, password) })
}
