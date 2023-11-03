<template>
  <section>
    <coach-filter
      @change-filter="changeFilter"
      :active-filters="activeFilters"
    ></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link="true" to="/register">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
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
import { mapGetters } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: { CoachItem, CoachFilter },
  computed: {
    getCoaches() {
      let coaches = this.$store.getters['coaches/getCoaches'];
      coaches = coaches.filter((coach) => {
        if (
          (this.activeFilters.frontend && coach.areas.includes('frontend')) ||
          (this.activeFilters.backend && coach.areas.includes('backend')) ||
          (this.activeFilters.career && coach.areas.includes('career'))
        ) {
          return true;
        } else {
          return false;
        }
      });

      console.log(coaches);
      return coaches;
    },

    ...mapGetters({
      hasCoaches: 'coaches/hasCoaches',
    }),
  },
  methods: {
    changeFilter(updatedFilters) {
      this.activeFilters = {
        ...this.activeFilters,
        ...updatedFilters,
      };
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
