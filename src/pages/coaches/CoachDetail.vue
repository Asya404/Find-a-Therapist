<template>
  <div>
    <section>
      <base-card>
        <div class="img-wrapper">
          <img class="coach__img" :src="selectedCoach.imageUrl" alt="" />
        </div>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :text="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button mode="fill" link="true" :to="contactLink"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      console.log(this.selectedCoach.description);
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/getCoaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.img-wrapper {
  text-align: center;
}

.coach__img {
  max-width: 90px;
  margin: 0 auto;
}

.badge {
  margin: 15px 0;
}
</style>
