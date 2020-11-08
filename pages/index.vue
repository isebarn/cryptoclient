<template>
  <v-layout row wrap>
    <v-container v-if="games.count !== 0" fluid>
      <v-row>
        <v-col v-if="topGame !== null" cols="6" offset="3">
          <v-card>
            <a :href="topGame.Path">
              <v-img
                :src="topGame.Icon"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              />
            </a>
            <v-card-title v-text="topGame.Name" />
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="game in gameList"
          :key="game.Id"
          cols="6"
        >
          <v-card>
            <a :href="game.Path">
              <v-img
                :src="game.Icon"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              />
            </a>
            <v-card-title v-text="game.Name" />
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
        self.games.push(...response.data)
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

  computed: {
    topGame () {
      return this.games.length > 0 ? this.games.filter(x => x.Id === 2)[0] : null
    },

    gameList () {
      return this.games.filter(x => x.Id !== 2)
    }
  }
}
</script>
