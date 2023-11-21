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
        id: payload.id,
        userEmail: payload.email,
        message: payload.message,
      };

      console.log(newRequest);

      const response = await fetch(
        `https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app/requests/${newRequest.id}.json`,
        {
          method: 'PUT',
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
      const response = await fetch(
        `https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app/requests.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch request'
        );
        throw error;
      }

      const requests = [];

      const coaches = context.rootGetters['coaches/getCoaches'];
      
      for (const key in responseData) {
        const requestedCoach = coaches.find((coach) => coach.id === key);
       
        
        const request = {
          id: key,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
          name: requestedCoach
            ? `${requestedCoach.firstName} ${requestedCoach.lastName}`
            : 'Unknown Coach',
        };

        requests.push(request);
      }
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    hasRequests(_, getters) {
      return getters.requests.length > 0;
    },
  },
};
