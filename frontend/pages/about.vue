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
          <h1>About</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2 class='q-question'>Dear DJ beginners</h2>
          <p class='q-answer'>
            For DJ beginners, having trouble selecting songs, use Nexxtrack!<br />
            <br />
            There are many things you need to learn in order to mix well as a DJ.<br />
            One of the most important things you need to learn is how to choose what songs to play.<br />
            When you are just starting out, you may not know many songs, so it is difficult to choose songs based on your own knowledge.<br />
            <br />
            In order to improve your sense of song selection, a shortcut is to learn about song selection by professional DJs.<br />
            Nexxtrack is a tool that tells you what songs are being played by professional DJs next to that song.<br />
            We have analyzed 7,000 of the most popular mixes by professional DJs and created a database of what the pros are mixing.<br />
            This allows us to suggest the next song to play for a song.<br />
            <br />
            You can try to find songs that match the songs you like and want to use in your mix, or train yourself to connect the suggested songs.<br />
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  head: { title: 'About' },
}
</script>
