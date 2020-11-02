<template>
  <div id="app">
    <Header />
    <section class="layout_section">
      <img class="w-100" src="~@assets/image/banner-s1.png" alt="" />
      <!-- <Swiper /> -->
      <router-view />
    </section>
  </div>
</template>

<script>
const Header = () => import("@views/common/header")
// const Swiper = () => import("@views/common/swiper")
export default {
  components: {
    Header
    // Swiper
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.w-100
  width 100%
#app
  font-size 38px
  .layout_section
    position relative
    top 130px
</style>
