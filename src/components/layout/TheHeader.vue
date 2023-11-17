<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Mental Health Therapist</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All therapists</router-link></li>
        <li><router-link to="/requests">Requests</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  color: #1d191f;
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid #1d191f;
  border-radius: 8px;
}

a:active,
a:hover,
a.router-link-active {
  background-color: #fff86d;
  border: 1px solid transparent;
}

h1 {
  font-size: 16px;
}

h1 a {
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
