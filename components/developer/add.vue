<template>
  <v-layout row wrap>
    <v-row>
      <v-col cols="6" offset="3">
        <v-card>
          <v-img
            :src="image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          />
          <v-card-title>{{ name }}</v-card-title>
          </v-img>
        </v-card>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          />

          <v-text-field
            v-model="image"
            label="image src"
            required
          />

          <v-text-field
            v-model="github"
            :rules="githubRules"
            label="github url"
            required
          />

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
      <v-col v-if="game_id !== null" cols="6" offset="3">
        <v-card>
          <v-card-title>
            Upload successfull!
          </v-card-title>
          <v-card-text>
            <div>Your game will be reviewed asap and once payment is complete it will be available on the site.</div>
            <div><span>Please transfer</span><span style="color:blue"> 50 BTC </span> <span>to </span><span style="color:blue">AZorQZZherif3asK7qB8K6Ec249GNmmyDv</span> with the message:</span><span style="color:blue">{{ ' Game id: ' + game_id }}</span></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: null,
      success: true,
      name: '',
      game_id: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      github: '',
      githubRules: [
        v => !!v || 'github url is required',
        v => /.+github/.test(v) || 'Not a github url'
      ],
      image: ''
    }
  },

  methods: {
    submit () {
      this.$refs.form.validate()

      if (this.valid) {
        this.save_game()
      }
    },

    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },

    save_game () {
      const self = this
      const data = {}
      data.name = this.name
      data.icon = this.image
      data.github = this.github
      data.user_id = this.$auth.user.Id
      try {
        this.$api.Games.post(data)
          .then(function (response) {
            self.game_id = response.data
            self.name = ''
            self.github = ''
            self.image = ''
            self.reset()
            self.resetValidation()
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
