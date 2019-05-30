<template>
  <div>
    <h1>Register</h1>
    <input type="email" name="email" placeholder="email" v-model="email">
    <br>
    <input type="password" name="password" id placeholder="password" v-model="password">
    <br>
    <div class="error" v-html="error"></div>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })        
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>
.error {
  color:red;
}
</style>
