<template>
  <v-container>
    <v-row text-xs-center>
      <v-card>
        <v-card-title primary-title>
          Login
        </v-card-title>
        <v-col>
          <v-text-field v-model="loginUsername" label="Username" />
          <v-text-field v-model="loginPassword" label="Password" />
          <v-btn color="success" @click="login">
            Login
          </v-btn>
        </v-col>
      </v-card>
    </v-row>
    <v-row text-xs-center>
      <v-card>
        <v-card-title primary-title>
          Register
        </v-card-title>
        <v-col>
          <v-text-field v-model="registerUsername" label="Username" />
          <v-text-field v-model="registerPassword" label="Password" />
          <v-text-field v-model="registerEmail" label="Email" />
          <v-btn color="success" @click="register">
            Register
          </v-btn>
        </v-col>
      </v-card>
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
    async login () {
      try {
        const result = await this.$userLogin(this.loginUsername, this.loginPassword)
        console.log(result)
        if (result) {
          this.$router.push('/')
        }
      } catch (e) {
        this.error = e.response.data.message
      }
    },

    async register () {
      const data = {}
      data.Username = this.registerUsername
      data.Password = this.registerPassword
      data.Email = this.registerEmail
      try {
        await this.$userRegister(data)
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
