<template>
  <v-container>
    <v-container>
      <v-row justify="center">
        <template v-if="!selected">
          <v-img contain max-width="320" src="/logo_transparent.png"></v-img>
        </template>

        <template v-else>
          <v-img contain max-width="120" src="/logo_transparent.png" @click="selected = null"></v-img>
        </template>
      </v-row>
    </v-container>

    <v-container
      v-if="selected"
    >
      <v-row>
        <v-col>
          <h3>Current Playing</h3>
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col cols="6">
          <v-img-fallback
            contain
            max-height="240"
            max-width="240"
            :alt="`${selected.title}`"
            :src="selected.artwork_url"
            fallbackSrc="/no-artwork_240.png"
            lazy-src="/no-artwork_240.png"
          ></v-img-fallback>
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <h2>
          {{selected.title}}
        </h2>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :href="selected.track_url" target="_blank" v-bind="attrs" v-on="on">
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </template>
          <span>View track info in 1001tracklists.com</span>
        </v-tooltip>
      </v-row>
    </v-container>

    <v-container v-if="recommendation.length > 0">
      <h3>Recommended Tracks</h3>
      <v-list>
        <v-list-group
          v-for="track in recommendation"
          :key="track.id"
        >
          <template v-slot:activator>
            <v-container>
              <v-row class="no-padding" align="center">
                <v-col cols="3" align="center"  class="half-padding">
                  <v-img-fallback
                    contain
                    max-height="120"
                    max-width="120"
                    :alt="`${track.title}`"
                    :src="track.artwork_url"
                    fallbackSrc="/no-artwork_120.png"
                    lazy-src="/no-artwork_120.png"
                  ></v-img-fallback>
                </v-col>
                <v-col cols="9"  class="no-padding">
                  <v-container>
                    <v-row  class="no-padding">
                      <title-and-artist-list-content
                          :title="track.title"
                      ></title-and-artist-list-content>
                    </v-row>
                    <v-row  class="no-padding">
                      <v-col>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon @click.stop :href="track.track_url" target="_blank" v-bind="attrs" v-on="on">
                              <v-icon>mdi-information</v-icon>
                            </v-btn>
                          </template>
                          <span>View track info in 1001tracklists.com</span>
                        </v-tooltip>
                      </v-col>
                      <v-col>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon @click.stop="chooseNext(track)" v-bind="attrs" v-on="on">
                              <v-icon>mdi-play</v-icon>
                            </v-btn>
                          </template>
                          <span>Select this track for next track</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <v-list-item
            class="using-tracklists"
            no-action
            v-for="tracklist in track.tracklists"
            sub-group
          >
            <v-avatar>
              <v-img-fallback :src="tracklist.artwork_url"></v-img-fallback>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="tracklist.title"></v-list-item-title>
              <v-list-item-subtitle>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon :href="tracklist.url" target="_blank"  v-bind="attrs" v-on="on">
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </template>
              <span>View tracklist info in 1001tracklists.com</span>
            </v-tooltip>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <h3>Search track</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="selected"
            :items="items"
            :loading="isLoading"
            :search-input.sync="inputValue"
            clearable
            no-filter
            item-text="title"
            item-value="id"
            return-object
            label="Search Track"
            solo
            append-icon="mdi-magnify"
          >
            <template v-slot:item="{ item }">
              <v-container :style="`width: ${dropdownWidth}px`">
                <v-row>
                  <v-img-fallback
                    class="artwork"
                    contain
                    max-height="90"
                    max-width="90"
                    :alt="`${item.title}`"
                    :src="item.artwork_url"
                    fallbackSrc="/no-artwork_90.png"
                    lazy-src="/no-artwork_90.png"
                  ></v-img-fallback>
                  <title-and-artist-list-content
                    :title="item.title"
                  ></title-and-artist-list-content>
                </v-row>
              </v-container>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import VImgFallback from '~/components/VImgFallback.vue'
import TitleAndArtistListContent from '~/components/TitleAndArtistListContent.vue'

export default {
  components: { VImgFallback, TitleAndArtistListContent },
  head: { title: '' },
  data() {
    return {
      isLoading: false,
      items: [],
      selected: null,
      inputValue: null,
      recommendation: [],
    }
  },
  computed: {
    dropdownWidth() {
      const elem = document.getElementsByClassName('v-autocomplete__content')[0]
      const styleAttr = elem?.getAttribute('style')
      const m = styleAttr?.match(/min\-width: (\d+)px;/)

      if (m) {
        return m[1]
      }

      return '528'
    }
  },
  watch: {
    async inputValue(input) {
      this.isLoading = true

      const resp = await this.$axios.$get(`/tracks?q=${input}`)

      this.items = resp.tracks

      this.isLoading = false
    },
    async selected(selection) {
      if (!selection) {
        this.recommendation = []
        return
      }
      const resp = await this.$axios.$get(`/recommends?track_id=${selection.id}`)
      this.recommendation = resp.tracks

      this.unfocus()
    }
  },
  methods: {
    chooseNext(track) {
      this.selected = track
    },
    unfocus() {
      const active_element = document.activeElement
      if(active_element){
        active_element.blur()
      }
    }
  },
}
</script>
<style scoped>
.using-tracklists {
  padding: 8px;
}
</style>
<style>
.v-list-group__header__append-icon {
  min-width: 24px !important;
  margin-left: 0 !important;

}
</style>
