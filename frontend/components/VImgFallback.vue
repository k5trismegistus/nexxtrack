<template>
  <v-img
    :src="imgSrc"
    v-bind="attrs"
    v-on="listeners"
  >
    <template v-for="(value, name) in $slots" v-slot:[name]>
      <slot :name="name"/>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "VImgFallback",
  inheritAttrs: false,
  data() {
    return {
      fallback: false,
    }
  },
  props: {
    fallbackSrc: String,
  },
  computed: {
    attrs() {
      const { src, ...newAttrs } = this.$attrs
      return newAttrs
    },
    listeners() {
      const vm = this;
      return {
        ...vm.$listenres,
        error: (e) => (this.fallback = true),
      }
    },
    imgSrc() {
      if (this.fallback || !this.$attrs.src) {
        return this.fallbackSrc
      }
      return this.$attrs.src
    }
  },
  methods: {
  }
}
</script>
