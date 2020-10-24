<template>
  <v-layout row wrap>
    <v-container v-if="games.count !== 0" fluid>
      <v-row dense>
        <v-col
          v-for="game in games"
          :key="game.id"
          cols="6"
        >
          <v-card>
            <a v-bind:href="game.path">
              <v-img
                :src="game.icon"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              />
            </a>
            <v-card-title v-text="game.name" />
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>

export default {

  fetch () {
    const self = this
    self.dison = true
    this.$api.Games.get()
      .then(function (response) {
        console.log(response.data)
        self.games.push(...response.data)
        console.log(self.games)
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        self.loading = false
      })
  },
  fetchOnServer: false,
  data () {
    return {
      games: []
    }
  },

  methods: {
    god (item) {
      print(item)
    }
  }
}
</script>
