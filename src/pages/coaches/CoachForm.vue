<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
          <label for="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            v-model.trim="firstName.val"
            @blur="clearValidity('firstName')"
          />
          <p class="error" v-if="!firstName.isValid">
            First Name must not be empty
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            v-model.trim="lastName.val"
            @blur="clearValidity('lastName')"
          />
          <p class="error" v-if="!lastName.isValid">
            Last Name must not be empty
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
          <label for="description">Description</label>
          <textarea
            id="description"
            rows="5"
            v-model.trim="description.val"
            @blur="clearValidity('description')"
          ></textarea>
          <p class="error" v-if="!description.isValid">
            Description must not be empty
          </p>
        </div>
        <div class="form-control" :class="{ invalid: !rate.isValid }">
          <label for="rate">Hourly rate</label>
          <input
            type="number"
            id="rate"
            v-model.number="rate.val"
            @blur="clearValidity('rate')"
          />
          <p class="error" v-if="!rate.isValid">
            Rate must be greater than 0
          </p>
        </div>

        <div class="form-control">
          <input type="file" @change="onFileSelected" />
        </div>

        <div class="form-control" :class="{ invalid: !areas.isValid }">
          <h3>Areas of Expertise</h3>
          <div class="areas-options">
            <div class="areas-option">
              <input
                type="checkbox"
                id="psychoanalysis"
                value="psychoanalysis"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="psychoanalysis">Psychoanalysis therapy</label>
            </div>
            <div class="areas-option">
              <input
                type="checkbox"
                id="behavior"
                value="behavior"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="behavior">Behavior therapy</label>
            </div>
            <div class="areas-option">
              <input
                type="checkbox"
                id="cognitive"
                value="cognitive"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="cognitive">Cognitive therapy</label>
            </div>
            <div class="areas-option">
              <input
                type="checkbox"
                id="humanistic"
                value="humanistic"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="humanistic">Humanistic therapy</label>
            </div>
          </div>

          <p class="error" v-if="!areas.isValid">
            At least one expertise must be selected
          </p>
        </div>
        <p class="error" v-if="!formIsValid">Please fix the above errors</p>
        <base-button mode="fill">Register</base-button>
      </form>
    </base-card>
  </section>
</template>

<script>
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
      image: null,
      imageUrl: '',
    };
  },
  methods: {
    onFileSelected(event) {
      this.image = event.target.files[0];
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
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
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      try {
        let imageRef = ref(storage, this.image.name);
        await uploadBytes(imageRef, this.image);

        const url = await getDownloadURL(imageRef);
        this.imageUrl = url;

        const formData = {
          first: this.firstName.val,
          last: this.lastName.val,
          desc: this.description.val,
          rate: this.rate.val,
          areas: this.areas.val,
          image: this.imageUrl,
        };

        await this.$store.dispatch('coaches/registerCoachAction', formData);
        this.$router.replace('/coaches');
      } catch (error) {
        console.error(error.message, 'Error uploading or getting the image');
      }
    },
  },
};
</script>

<style>
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
