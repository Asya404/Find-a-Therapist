import { createStore } from 'vuex';
import coachesStore from './modules/coaches.js';
import requestsStore from './modules/requests.js';

const store = createStore({
  modules: {
    coaches: coachesStore,
    requests: requestsStore,
  },
});

export default store;
