export default {
  userId(state: { userId: number } | null) {
    return state?.userId || null
  },
  token(state: { token: string } | null) {
    return state?.token || null
  },
  isAuthenticated(state: { token: boolean }) {
    return !!state.token
  },
  didAutoLogout(state: { didAutoLogout: any }) {
    return state.didAutoLogout
  },
}
