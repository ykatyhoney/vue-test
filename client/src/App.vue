<template>
  <div id="app">
    <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link">Dashboard</router-link>
        <router-link v-if="isAuditor" to="/allocated" class="nav-item nav-link">
          Allocated
        </router-link>
        <router-link v-if="isMember" to="/stats" class="nav-item nav-link">
          Stats
        </router-link>
        <a @click="logout" class="nav-item nav-link">Logout</a>
      </div>
    </nav>
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3"><router-view></router-view></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { authenticationService } from "./_services/authentication.service";
import Role from "./_helpers/role";
import { router } from "./router";
export default {
  name: "app",
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
  },
  computed: {
    isAuditor() {
      return this.currentUser && this.currentUser.role === Role.AUDITOR;
    },
    isMember() {
      return this.currentUser && this.currentUser.role === Role.MEMBER;
    },
  },
  methods: {
    logout() {
      authenticationService.logout();
      router.push("/signin");
    },
  },
};
</script>
<style>
</style>
