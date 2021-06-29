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
          <h2>Contact</h2>
        </v-col>
      </v-row>

      <v-row justify="center" class="contact-btns">
        <v-col cols="4" align="center">
          <a href="https://www.facebook.com/k5.trismegistus" target="_blank">
            <v-icon size="64">mdi-facebook</v-icon>
          </a>
        </v-col>
        <v-col cols="4" align="center">
          <a href="https://www.instagram.com/k5trismegistus" target="_blank">
            <v-icon size="64">mdi-instagram</v-icon>
          </a>
        </v-col>
        <v-col cols="4" align="center">
          <a href="https://github.com/k5trismegistus/nexxtrack" target="_blank">
            <v-icon
              class="link"
              size="64"
              target="_blank"
            >mdi-github</v-icon>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  head: { title: 'Contact' },
}
</script>
<style scoped>
.contact-btns {
  padding-top: 30px;
  padding-bottom: 60px;
}
</style>