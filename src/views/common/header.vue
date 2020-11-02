<template>
  <header>
    <div class="layout_head">
      <img src="@assets/logo.png" alt="" />
      <div class="uname">
        <span ref="uname" @click="showBox = !showBox">{{ uname }}</span>
        <div :class="[{ active: showBox }, 'ubox']">
          <p ref="logout" @click="logout">logout</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      showBox: false
    }
  },
  mounted() {
    var uname = localStorage.getItem(this.$util.encryKey("uname"))
    if (uname) {
      this.uname = this.$util.decryKey(uname) || ""
    }
    document.addEventListener("click", (e) => {
      var contentEle = this.$refs.logout
      if (
        e.target !== this.$refs.uname &&
        contentEle !== e.target &&
        !contentEle.contains(e.target)
      ) {
        this.showBox = false
      }
    })
    this.getMsg()
  },
  methods: {
    getMsg() {
      this.$bus.$on("uname", (res) => {
        console.log(res)
        if (res) {
          this.uname = res.uname
        }
      })
    },
    logout() {
      this.showBox = false
      console.log("logout")
      this.$util.logout()
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  top 0
  left 0
  height 130px
  background #fff
  z-index 100
  width calc(100% - 50px)
  padding 0 25px
  .layout_head
    display flex
    align-items center
    justify-content space-between
    height 100%
    img
      height 70%
      vertical-align middle
    .uname
      // width 100%
      color #666
      position relative
      // overflow hidden
      // text-overflow ellipsis
      line-height normal
      // white-space nowrap
      width 50%
      text-align right
      span
        display block
        overflow hidden
        text-overflow ellipsis
      .ubox
        background #fff
        position absolute
        border 3px solid #ddd
        opacity 0
        display none
        z-index -1
        border-radius 15px
        right 0
        bottom calc(-100% - 30px)
        padding 10px 20px
        transition all .4s ease
        p
          font-size 30px
        &.active
          display block
          opacity 1
        &:after
          content ''
          display inline-block
          border 10px solid transparent
          border-bottom-color #ddd
          position absolute
          z-index 1000
          right 15px
          top -12px
          transform translate(0,-50%)
</style>
