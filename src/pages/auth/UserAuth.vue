<template>
  <base-card>
    <form>
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" id="email" />
      </div>
      <div class="form-control">
        <label for="email">Password</label>
        <input type="password" id="password" />
      </div>
      <base-button mode="fill">Login</base-button>
      <base-button type="button" mode="outline">Signup instead</base-button>
    </form>
  </base-card>
</template>

<style scoped>
form {
  margin-top: 1rem;
  border-radius: 12px;
  padding: 1rem;
}
</style>
