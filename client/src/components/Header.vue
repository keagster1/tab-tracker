<template>
    <v-toolbar fixed class="cyan" dark>
        <router-link to="/" tag="v-toolbar-title" class="mr-4 home">Tabtracker</router-link>
        <v-toolbar-items>
            <v-btn to='/songs' flat dark>Browse</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-if="!$store.state.isUserLoggedIn" to='/register' flat dark>
                Sign Up
            </v-btn>
            <v-btn v-if="!$store.state.isUserLoggedIn" to='/login' flat dark>
                Log In
            </v-btn>
            <v-btn v-if="$store.state.isUserLoggedIn" @click="logout" flat dark>
                Log Out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'root'
            })
        }
    }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}
.home:hover {
    color: #E9E;
}
</style>
