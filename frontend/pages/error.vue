<template>
  <v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" align="center">
          <nuxt-link :to="{ name: 'index' }">
            <v-img
              class="link"
              contain
              max-width="120"
              src="/logo_transparent.png"
            ></v-img>
          </nuxt-link>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h1>Error</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2>Something wrong with this site</h2>
          <p>
            If you'd like, please submit bug report as issue <a class="here-link" href="https://github.com/k5trismegistus/nexxtrack" target="_blank">here</a> (Jump to Github)
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  head: { title: 'Error' },
}
</script>
<style scoped>
.here-link {
  color: white;
  text-decoration: underline;
}
</style>
