<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 42rem;
  background-color: #F8F6F2;
}
</style>
