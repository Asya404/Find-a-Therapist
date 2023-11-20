<template>
  <li>
    <div class="coach__info">
      <img class="coach__img" src="../../assets/imagefile.webp" alt="" />
      <div class="wrapper">
        <h3>{{ fullName }}</h3>
        <h4>${{ coach.hourlyRate }}/hour</h4>
        <div>
          <base-badge
            v-for="area in coach.areas"
            :key="area"
            :type="area"
            :text="area"
          ></base-badge>
        </div>
      </div>
    </div>
    <div class="actions">
      <base-button mode="outline" link="true" :to="coachContactLink"
        >Contact</base-button
      >
      <base-button mode="fill" link="true" :to="coachDetailsLink">View details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['coach'],
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.coach.id + '/contact';
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.coach.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.coach__info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.coach__img {
  max-width: 70px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
