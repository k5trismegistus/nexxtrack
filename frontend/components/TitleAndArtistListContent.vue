<template>
  <v-list-item-content>
    <v-list-item-title v-text="trackTitle"></v-list-item-title>
    <v-list-item-subtitle v-text="artist"></v-list-item-subtitle>
  </v-list-item-content>
</template>
<script>
export default {
  name: "TitleAndArtistListContent",
  props: {
    title: String
  },
  computed: {
    trackTitle() {
      return this.title.split(' - ')[1]
    },
    artist() {
      return this.title.split(' - ')[0]
    }
  }
}
</script>