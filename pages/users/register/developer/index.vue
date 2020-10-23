<template>
  <v-container>
    <v-row align="center">
      <v-col offset="4" cols="4">
        <v-card>
          <v-card-title primary-title>
            Register developer
          </v-card-title>
          <v-col>
            <v-text-field v-model="registerUsername" label="Username" />
            <v-text-field v-model="registerPassword" label="Password" />
            <v-text-field v-model="registerEmail" label="Email" />
            <v-btn color="success" block @click="register">
              Register
            </v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerEmail: ''
    }
  },

  methods: {
    async register () {
      const data = {}
      data.Username = this.registerUsername
      data.Password = this.registerPassword
      data.Email = this.registerEmail
      data.Developer = true
      try {
        await this.$userRegister(data)
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
