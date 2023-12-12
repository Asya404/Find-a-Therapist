<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model.trim="userData.email" />
      </div>
      <div class="form-control">
        <label for="email">Password</label>
        <input type="password" id="password" v-model.trim="userData.password" />
      </div>
      <p v-if="!userData.formIsValid" class="error">
        Please enter a valid e-mail and password (must be at least 6 characters
        long)
      </p>
      <base-button mode="fill">{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="outline" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        email: '',
        password: null,
        formIsValid: true,
        mode: 'login',
      }
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.userData.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.userData.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    submitForm() {
      this.userData.formIsValid = true;
      if (
        this.userData.email === '' ||
        !this.userData.email.includes('@') ||
        this.userData.password.length < 6
      ) {
        this.userData.formIsValid = false;
        return;
      }
      console.log(this.userData.formIsValid)
      if (this.userData.mode === 'login') {
        //...
      } else {
        this.$store.dispatch('signup', this.userData);
      }
    },
    switchAuthMode() {
      if (this.userData.mode === 'login') {
        this.userData.mode = 'signup';
      } else {
        this.userData.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 1rem;
  border-radius: 12px;
  padding: 1rem;
}
</style>
