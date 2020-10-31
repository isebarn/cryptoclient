<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items.filter(x => loggedIn(x))"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <register />
      <login />
      <logout />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import login from '~/components/users/login.vue'
import logout from '~/components/users/logout.vue'
import register from '~/components/users/register.vue'

export default {
  components: {
    login,
    logout,
    register
  },

  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
          visible: true
        },
        {
          icon: 'mdi-account-plus-outline',
          title: 'Developers',
          to: '/developers/',
          visible: this.$auth.loggedIn && this.$auth.user[0].developer
        }
      ],
      title: 'Title'
    }
  },

  methods: {
    loggedIn (x) {
      return this.$auth.loggedIn || x.visible
    }
  }
}
</script>
