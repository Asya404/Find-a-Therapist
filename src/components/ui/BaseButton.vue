<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<!--Only one of the two should be rendered at the same time 
(button or link)-->

<script>
export default {
  props: ['link', 'to', 'mode'],
};
</script>

<style scoped>
button,
a {
  color: #1d191f;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  
  cursor: pointer;
  border-radius: 8px;
  margin-right: 0.5rem;
  display: inline-block;
  font-weight: 700;
  border: none;
}

.fill {
  background-color: #fff86d;
  border: none;
}

.outline {
  background-color: transparent;
  border: 1px solid #1d191f;
}

.outline:hover,
.outline:active {
  background-color: #fff86d;
  border: 1px solid transparent;
}
</style>
