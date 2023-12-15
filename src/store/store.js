import { createStore } from 'vuex';
import coachesStore from './modules/coaches.js';
import requestsStore from './modules/requests.js';

const store = createStore({
  modules: {
    coaches: coachesStore,
    requests: requestsStore,
  },
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    async login(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcrCWW9qvBXrgNb9i9bpNzAHwXybr3Mdw',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message || 'Failed to authenticate');
      }
      console.log(responseData);
      context.commit('setUser', responseData);
    },
    async signup(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcrCWW9qvBXrgNb9i9bpNzAHwXybr3Mdw',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message || 'Failed to authenticate');
      }
      context.commit('setUser', responseData);
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.idToken;
      state.userId = payload.localId;
      state.tokenExpiration = payload.expiresIn;
    },
  },
});

export default store;
