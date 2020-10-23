<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn v-show="!loggedIn" class="ma-2 white--text" color="#8AC0E3" depressed v-on="on">
        Register
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        Register
      </v-card-title>
      <v-col>
        <v-text-field v-model="registerUsername" label="Username" />
        <v-text-field v-model="registerPassword" label="Password" />
        <v-text-field v-model="registerEmail" label="Email" />
        <v-checkbox :checked="developer" label="Developer account" />
        <v-btn color="success" block @click="register">
          Register
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data () {
    return {
      registerUsername: '',
      registerPassword: '',
      registerEmail: '',
      dialog: false,
      developer: false
    }
  },

  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    }
  },

  methods: {
    async register () {
      const data = {}
      data.Username = this.registerUsername
      data.Password = this.registerPassword
      data.Email = this.registerEmail
      data.Developer = this.developer
      try {
        const result = await this.$userRegister(data)

        console.log(result.data)
        console.log(result)
        if (result.status === 200) {
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
