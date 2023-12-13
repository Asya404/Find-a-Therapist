<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <li v-for="request in receivedRequests" :key="request.id">
            <div>
              <a class="request__mail" href="mailto: request.email"
                >from: {{ request.userEmail }}</a
              >
              <p>{{ request.message }}</p>
            </div>
          </li>
        </ul>
        <h3 v-else>You haven't received any requests yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequest');
      } catch (error) {
        this.error = error.message || 'Something failed';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}

h3 {
  text-align: center;
}

li {
  margin-bottom: 1.5rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0 0 5px 0;
}

.request__name {
  color: #ee8013;
  font-size: 16px !important;
  font-weight: 700;
  margin-bottom: 5px;
}

.request__mail {
  font-size: 16px;
  display: inline-block;
  color: #000;
  margin-bottom: 10px;
}
</style>
