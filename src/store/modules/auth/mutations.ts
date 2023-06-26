export default {
  setUser(state: { token: any; userId: any; didAutoLogout: boolean }, payload: { token: any; userId: any }) {
    state.token = payload.token
    state.userId = payload.userId
    state.didAutoLogout = false
  },
  setAutoLogout(state: { didAutoLogout: boolean }) {
    state.didAutoLogout = true
  },
}
