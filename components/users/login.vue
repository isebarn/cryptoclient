<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn v-show="!loggedIn" class="ma-2 white--text" color="#6E73D0" depressed v-on="on">
        Login
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        Login
      </v-card-title>
      <v-col>
        <v-text-field v-model="loginUsername" label="Email" />
        <v-text-field v-model="loginPassword" label="Password" autocomplete="new-password" type="Password" />
        <v-btn block color="#5DD099" @click="login">
          Login
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data () {
    return {
      loginUsername: '',
      loginPassword: '',
      dialog: false
    }
  },

  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    }
  },

  methods: {
    async login () {
      try {
        const result = await this.$userLogin(this.loginUsername, this.loginPassword)
        if (result) {
          this.dialog = false
        }
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.v-card__title {
  background-color: #609FC7;
  color:#FFFFFF;
  font-size: 34px;
}

</style>
