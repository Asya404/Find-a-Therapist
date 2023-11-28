<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="email">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid" class="error">
        Please enter a valid e-mail and password (must be at least 6 characters
        long)
      </p>
      <base-button mode="fill" @click="switchAuthMode">{{
        submitButtonCaption
      }}</base-button>
      <base-button
        type="button"
        mode="outline"
        @click="switchAuthMode"
        >{{ switchModeButtonCaption }}</base-button
      >
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: null,
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      // send http
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
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
