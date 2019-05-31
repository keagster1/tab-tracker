<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <Panel title="Login">
        <form name="tab-tracker-form" autocomplete="off">
          <v-text-field name="email" label="Email" v-model="email"></v-text-field>
          <br>
          <v-text-field name="password" type="Password" label="password" v-model="password"></v-text-field>
          <br>
          <div class="danger-alert" v-html="error"></div>
          <v-btn class="cyan" dark @click="login">Login</v-btn>
        </form>
      </Panel>
    </v-flex>
  </v-layout>
</template>

<script>

import AuthenticationService from "@/services/AuthenticationService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = (await AuthenticationService.login({
          email: this.email,
          password: this.password
        })).data;
        this.$store.dispatch("setToken", response.token);
        this.$store.dispatch("setUser", response.user);
        this.$router.push({name: 'songs'})
      } catch (error) {
        this.error = error.response.data.error;
        console.log(this.error);
      }
    }
  }
};
</script>

<style>
.red {
  color: red;
}
</style>
