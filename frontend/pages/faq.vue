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
          <h1>FAQ</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2 class='q-question'>I can't find a track, Why?</h2>
          <p class='q-answer'>
            If the song you are looking for is not included in the analyzed track list, it will not be displayed. <br />
            We analyzed the top 25% most popular playlists played between 2000 and 2020 that are listed in 1001tracklist. <br />
            So less famous or newer songs may not be shown. <br />
            And also there may be unknown bugs etc...
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class='q-question'>I found the example of recommended mix is wrong on example playlist, Why?</h2>
          <p class='q-answer'>
            We are currently finding that the mashup mix items in the playlist are not parsing well. <br />
            We are working on fixing this in the future.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class='q-question'>I found the bug on this website. How to tell you?</h2>
          <p class='q-answer'>
            Please contact from <nuxt-link class='here-link' :to="{ name: 'contact' }">Here</nuxt-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  head: { title: 'FAQ' },
}
</script>
<style scoped>
.q-question {
  line-height: 1.2em;
  margin-bottom: 1rem;
}

.q-answer {
  line-height: 1.4em;
  margin-bottom: 1.2em;
}

.here-link {
  color: white;
  text-decoration: underline;
}
</style>