<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="tab-tracker-form" autocomplete="off">
            <v-text-field name="email" label="Email" v-model="email"></v-text-field>
            <br>
            <v-text-field
              name="password"
              type="Password"
              label="password"
              autocomplete="new-password"
              v-model="password"
            ></v-text-field>
            <br>
            <div class="error" v-html="error"></div>
            <v-btn class="cyan" dark @click="register">Register</v-btn>
          </form>
        </div>
      </div>
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
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.token);
      } catch (error) {
        this.error = error.response.data.error;
        console.log(this.error);
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
