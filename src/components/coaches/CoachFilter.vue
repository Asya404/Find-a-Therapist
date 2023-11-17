<template>
  <base-card>
    <h2>Find your therapist</h2>
    <div class="filter-options">
      <span class="filter-option">
        <input
          type="checkbox"
          id="psychoanalysis"
          checked
          @change="updateFilter"
        />
        <label for="psychoanalysis">Psychoanalysis therapy</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="behavior" checked @change="updateFilter" />
        <label for="behavior">Behavior therapy</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="cognitive" checked @change="updateFilter" />
        <label for="cognitive">Cognitive therapy</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="humanistic" checked @change="updateFilter" />
        <label for="humanistic">Humanistic therapy</label>
      </span>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      allFilters: {
        psychoanalysis: true,
        behavior: true,
        cognitive: true,
        humanistic: true,
      },
    };
  },
  methods: {
    updateFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;

      this.allFilters = {
        ...this.allFilters,
        [inputId]: isActive,
      };
      this.$emit('change-filter', this.allFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
}

.filter-option {
  width: 48%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.form__privacy {
  display: flex;
  align-items: center;
}

label {
  color: #6d6d6d;
  font-size: 162x;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
