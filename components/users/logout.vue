<template>
  <v-btn v-show="loggedIn" class="ma-2 white--text" color="#9599E7" @click="logout">
    Log out
    <v-icon>mdi-logout-variant</v-icon>
  </v-btn>
</template>
<script>
export default {
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    }
  },

  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
