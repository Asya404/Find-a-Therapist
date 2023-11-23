<template>
  <base-card>
    <h2>Choose area of expertise</h2>
    <div class="areas-options">
      <span class="areas-option">
        <input
          type="checkbox"
          id="psychoanalysis"
          checked
          @change="updateFilter"
        />
        <label for="psychoanalysis">Psychoanalysis therapy</label>
      </span>
      <span class="areas-option">
        <input type="checkbox" id="behavior" checked @change="updateFilter" />
        <label for="behavior">Behavior therapy</label>
      </span>
      <span class="areas-option">
        <input type="checkbox" id="cognitive" checked @change="updateFilter" />
        <label for="cognitive">Cognitive therapy</label>
      </span>
      <span class="areas-option">
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
.form__privacy {
  display: flex;
  align-items: center;
}
</style>
