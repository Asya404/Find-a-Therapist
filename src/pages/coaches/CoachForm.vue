<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
          <label for="firstname">First Name</label>
          <input type="text" id="firstname" v-model.trim="firstName.val" />
          <p class="message" v-if="!firstName.isValid">
            First Name must not be empty
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
          <label for="lastname">Last Name</label>
          <input type="text" id="lastname" v-model.trim="lastName.val" />
          <p class="message" v-if="!lastName.isValid">
            Last Name must not be empty
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
          <label for="description">Description</label>
          <textarea
            id="description"
            rows="5"
            v-model.trim="description.val"
          ></textarea>
          <p class="message" v-if="!description.isValid">
            Description must not be empty
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !rate.isValid }">
          <label for="rate">Hourly rate</label>
          <input type="number" id="rate" v-model.number="rate.val" />
          <p class="message" v-if="!rate.isValid">
            Rate must be greater than 0
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !areas.isValid }">
          <h3>Areas of Expertise</h3>
          <div>
            <input
              type="checkbox"
              id="frontend"
              value="frontend"
              v-model="areas.val"
            />
            <label for="frontend">Frontend Development</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="backend"
              value="backend"
              v-model="areas.val"
            />
            <label for="backend">Backend Development</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="career"
              value="career"
              v-model="areas.val"
            />
            <label for="career">Career Advisory</label>
          </div>
          <p class="message" v-if="!areas.isValid">
            At least one expertise must be selected
          </p>
        </div>
        <p class="message" v-if="!formIsValid">Please fix the above errors</p>
        <base-button>Register</base-button>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName,
        last: this.lastName,
        desc: this.description,
        rate: this.rate,
        areas: this.areas,
      };

      this.$store.dispatch('coaches/registerCoachAction', formData);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.message {
  color: red;
  font-size: 12px;
  margin: 5px 0 20px 0;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
