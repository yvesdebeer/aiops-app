<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark" role="navigation">
  <div class="container">
    <router-link to="/search" class="navbar-brand mr-auto">AI-Ops Incident Similarity</router-link>
      <ul class="navbar-nav mr-auto">
      </ul>
      <ul class="nav navbar-nav">
        <router-link to="/" tag="li" v-if="!isAuthenticated" class="nav-item" active-class="active">
          <a @click="onLoginClicked" class="nav-link">Login</a>
        </router-link>
        <li v-if="isAuthenticated" class="li-pointer nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ getUserName() }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a @click="onLogoutClicked" class="dropdown-item">Logout {{ userEmail }}</a>
            </div>
          </div>
        </li>
      </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: 'NavHeader',
  computed: {
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    },
    isAuthenticated() {
      //console.log(this.$store.state.user.isAuthenticated);
      return this.$store.state.user.isAuthenticated;
    },
  },
  methods: {
    onLoginClicked() {
      window.location = this.$store.state.endpoints.login;
    },
    onLogoutClicked() {
      this.$store.commit("logout");
      window.location = '/';
    },
    getUserName() {
      return this.$store.state.user.name;
    }
  }
}
</script>