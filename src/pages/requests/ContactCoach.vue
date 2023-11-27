<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your email</label>
      <input type="email" id="email" v-model.trim="request.email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="request.message"></textarea>
    </div>
    <p class="error" v-if="!request.formIsValid">
      Please enter a valid email and non-empty message.
    </p>
    <div class="actions">
      <base-button mode="fill">Send message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      request: {
        id: this.$route.params.id,
        email: '',
        message: '',
        formIsValid: true,
      },
    };
  },
  methods: {
    submitForm() {
      this.request.formIsValid = true;

      if (
        this.request.email === '' ||
        !this.request.email.includes('@') ||
        this.request.message === ''
      ) {
        this.request.formIsValid = false;
        return;
      }
      this.$store.dispatch('requests/contactCoach', this.request);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 1rem;
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem;
}

.actions {
  text-align: center;
}
</style>