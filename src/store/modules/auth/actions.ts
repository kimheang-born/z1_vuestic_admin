export default {
  async login(context: any, payload: { phone: any; password: any }) {
    const url = `https://pre.z1platform.com/api/v2/signin-or-signup`

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: payload.phone,
        password: payload.password,
      }),
    }

    const response = await fetch(url, options)
    const responseData = await response.json()

    localStorage.setItem('token', responseData.access_token)
    localStorage.setItem('userId', responseData.user_id)

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
      throw error
    }

    context.commit('setUser', {
      token: responseData.access_token,
      userId: responseData.user_id,
    })
  },
}
