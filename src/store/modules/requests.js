export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to send request'
        );
        throw error;
      }

      context.commit('addRequest', newRequest);
    },
    async fetchRequest(context) {
      const coachId = context.rootGetters.userId;
      const response = await fetch(
        `https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch request'
        );
        throw error;
      }

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requests.push(request);
      }
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      return state.requests.filter((req) => req.coachId === rootGetters.userId);
    },
    hasRequests(_, getters) {
      return getters.requests.length > 0;
    },
  },
};
