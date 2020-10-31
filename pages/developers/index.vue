<template>
  <v-container>
    <v-tabs v-model="tab" centered>
      <v-tab>My games</v-tab>
      <v-tab>Upload</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <games />
      </v-tab-item>
      <v-tab-item>
        <add />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import games from '~/components/developer/games.vue'
import add from '~/components/developer/add.vue'

export default {
  middleware: 'developer',

  components: {
    games,
    add
  },

  data () {
    return {
      tab: 0
    }
  }

}
</script>
