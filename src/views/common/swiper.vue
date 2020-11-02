<template>
  <cube-slide :data="items" class="cus_cube_slide" />
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          url: "javascript:;",
          image: require("@assets/image/banner-s1.png")
        },
        {
          url: "javascript:;",
          image: require("@assets/image/banner-s1.png")
        },
        {
          url: "javascript:;",
          image: require("@assets/image/banner-s1.png")
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.cus_cube_slide
  & >>> .cube-slide-item img
    width 100%
  & >>> .cube-slide-dots
    bottom 20px
    & span
      border-radius 50%
      width 20px
      margin 0 40px
      background rgba(250,250,250,.6)
      height 20px
      &.active
        background #FBA31A
</style>
