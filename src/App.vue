<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*:focus {
  outline: none;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  background-color: #c3e9d8;
  color: #1d191f;
  font-size: 14px;
}

input[type='checkbox'] {
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  appearance: none;
  position: relative;
  width: 23px;
  height: 23px;
  cursor: pointer;
}

input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border: 3px solid #ddd;
  border-radius: 5px;
}

input[type='checkbox']::after {
  content: '';
  position: absolute;
  width: 11px;
  height: 5px;
  top: 6px;
  left: 5px;
  border-bottom: 3px solid #ee8013;
  border-left: 3px solid #ee8013;
  transform: rotate(-45deg);
  transition: opacity 0.3s;
  opacity: 0;
}

input[type='checkbox']:focus {
  outline: none;
}

input[type='checkbox']:checked::after {
  opacity: 1;
  outline: none;
}
</style>
