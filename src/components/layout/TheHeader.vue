<template>
  <header>
    <nav>
      <h1><router-link to="/">Logo</router-link></h1>
      <ul>
        <li>
          <router-link class="header__link" to="/coaches"
            >All therapists</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <router-link class="header__link" to="/requests"
            >Requests</router-link
          >
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

header img {
  max-width: 80px;
}

header a {
  color: #1d191f;
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid #1d191f;
  border-radius: 8px;
}

.header__link:active,
.header__link:hover,
.header__link.router-link-active {
  background-color: #fff86d;
  border: 1px solid transparent;
}

h1 a {
  font-size: 30px;
  color: transparent;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: none;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
