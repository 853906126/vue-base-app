const getters = {
  keepAlive: (state) => state.app.keepAlive,
  isLoading: (state) => state.app.loading,
  token: (state) => state.app.token,
  userInfo: (state) => state.app.userInfo,
}
export default getters
