<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="8">
            <v-card>
              <nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-row>
        <v-col>
          <nuxt-link to="/faq" class="footer-link"><span>FAQ</span></nuxt-link>
          <nuxt-link to="/contact" class="footer-link"><span>Contact</span></nuxt-link>
        </v-col>

        <v-col justify="right" class="copyright">
          <span>&copy; 2021 Nexxtrack</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
      title: 'Nexxtrack'
    }
  }
}
</script>
<style>
a {
  text-decoration: none;
}

.link {
  cursor: pointer;
}
</style>
<style scoped>
.footer-link {
  color: white;
  margin-right: 24px;
}
.copyright {
  text-align: right;
}
</style>