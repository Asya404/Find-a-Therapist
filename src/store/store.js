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
      userId: 'c3',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
