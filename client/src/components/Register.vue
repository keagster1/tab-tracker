<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <Panel title="Register">
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
          <div class="danger-alert" v-html="error"></div>
          <v-btn class="cyan" dark @click="register">Register</v-btn>
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
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.token);
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
.danger-alert {
  color: red;
}
</style>
