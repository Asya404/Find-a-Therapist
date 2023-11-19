<template>
  <section>
    <section class="animation">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://lottie.host/047ab9c6-c069-4e50-bed2-e689583def1e/PiOCQ4XPYy.json"
        style="width: 320px; margin: 0 auto"
      ></lottie-player>
    </section>
    <coach-filter
      @change-filter="changeFilter"
      :active-filters="activeFilters"
    ></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link="true" to="/register"
          >Register as Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches && !isLoading">
        <coach-item
          v-for="coach in getCoaches"
          :key="coach.id"
          :coach="coach"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script>
import '@lottiefiles/lottie-player';
import { mapGetters } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        psychoanalysis: true,
        behavior: true,
        cognitive: true,
        humanistic: true,
      },
    };
  },
  components: { CoachItem, CoachFilter },
  computed: {
    getCoaches() {
      let coaches = this.$store.getters['coaches/getCoaches'];
      console.log(coaches);
      coaches = coaches.filter((coach) => {
        if (
          (this.activeFilters.psychoanalysis &&
            coach.areas.includes('psychoanalysis')) ||
          (this.activeFilters.behavior && coach.areas.includes('behavior')) ||
          (this.activeFilters.cognitive && coach.areas.includes('cognitive')) ||
          (this.activeFilters.humanistic && coach.areas.includes('humanistic'))
        ) {
          return true;
        } else {
          return false;
        }
      });
      return coaches;
    },

    ...mapGetters({
      hasCoaches: 'coaches/hasCoaches',
      isCoach: 'coaches/isCoach',
    }),
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    changeFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
