<template>
  <div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <h1>Dashboard</h1>
    <h2 class="my-3">Hello, {{ this.name }}</h2>
    <button v-on:click="logout()" class="btn btn-primary">Logout</button>
  </div>
</template>

<script>
const { API_URL } = require("../constants.js");
const SECRET_URL = API_URL + "/secret";

export default {
  mounted() {
    if (this.$route.params.error && this.$route.params.error === 404) {
      this.errorMessage = "Page Not Found";
    }
    fetch(SECRET_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "application/json",
      },
      cache: "no-store",
      // maybe there is a way to stop ajax if cached
    })
      .then((response) => {
        //     console.log(response);
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => {
          throw new Error(error.error);
        });
      })
      .then((result) => {
        // console.log("result", result);
        this.name = result.secret;
      })
      .catch((error) => {
        // console.log("error", error);
        this.logout();
      });
  },
  data: () => ({
    errorMessage: "",
    name: "",
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/signin");
    },
  },
};
</script>

<style>
</style>
