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
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcrCWW9qvBXrgNb9i9bpNzAHwXybr3Mdw';

      if (mode === 'signup') {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcrCWW9qvBXrgNb9i9bpNzAHwXybr3Mdw';
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message || 'Failed to authenticate');
      }

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);

      context.commit('setUser', responseData);
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      context.commit('setUser', {
        idToken: token,
        localId: userId,
      });
    },
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup',
      });
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      context.commit('setUser', {
        idToken: null,
        localId: null,
      });
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.idToken;
      state.userId = payload.localId;
    },
  },
});

export default store;
