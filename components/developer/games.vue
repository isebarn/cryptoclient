<template>
  <v-container v-if="games.count !== 0" fluid>
    <v-row dense>
      <v-col
        v-for="game in games"
        :key="game.Id"
        cols="6"
        offset="3"
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
          <v-card-title>{{ game.Name + (game.Active ? '' : ' (pending approval)') }}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  fetch () {
    const self = this
    self.dison = true
    this.$api.Games.user_games(this.$auth.user.Id)
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
  }
}
</script>
