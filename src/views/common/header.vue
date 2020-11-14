<template>
  <header>
    <div class="layout_head">
      <img src="@assets/logo.png" alt="" />
      <div class="toolbar">
        <div class="uname">
          <span
            @click.stop="
              showBox = !showBox
              showLang = false
            "
            >{{ uname }}</span
          >
          <transition name="fade">
            <div v-show="showBox" class="ubox">
              <p @click="logout">{{ $t("btnGroup.logout") }}</p>
            </div>
          </transition>
        </div>
        <div class="lang">
          <img
            @click.stop="
              showLang = !showLang
              showBox = false
            "
            class="img-size"
            src="@assets/image/icon/earth.png"
            alt=""
          />
          <transition name="fade">
            <div v-show="showLang" class="ubox">
              <ul class="inner-ul">
                <li
                  v-for="(item, idx) in langList"
                  :key="idx"
                  @click="switchLang(item.k)"
                >
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </transition>
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
      langList: [
        {
          label: "English",
          k: "en"
        },
        {
          //Việt Nam
          label: "Bahasa Indonesia",
          k: "id"
        },
        {
          //Việt Nam
          label: "Tiếng việt",
          k: "vi"
        }
        // {
        //   label: "中文",
        //   k: "zh"
        // }
      ],
      selLang: "",
      showLang: false,
      showBox: false
    }
  },
  mounted() {
    var uname = localStorage.getItem(this.$util.encryKey("uname"))
    if (uname) {
      this.uname = this.$util.decryKey(uname) || ""
    }
    document.addEventListener("click", (e) => {
      this.showLang && (this.showLang = false)
      this.showBox && (this.showBox = false)
    })
    this.getMsg()
  },
  methods: {
    getMsg() {
      this.$bus.$on("uname", (res) => {
        if (res) {
          this.uname = res.uname
        }
      })
    },
    // 切换语言
    switchLang(lang) {
      var ev = event || window.event
      this.showLang = false
      localStorage.setItem("lang", lang)
      this.$i18n.locale = lang
      this.$util.showToast(this.$t("tips.switchSuc"))
      // this.setLang(locale) // 异步更新状态
      // this.selLang = lang
      console.log("切换语言:" + lang)
      console.log(this.$i18n)
    },
    // 退出
    logout() {
      var ev = event || window.event
      this.showBox = false
      this.$util.logout()
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0

box()
  background #fff
  position absolute
  border 3px solid #ddd
  border-radius 15px
  right 0
  transition all .4s ease

header
  position fixed
  top 0
  left 0
  height 130px
  background #fff
  z-index 100
  width calc(100% - 50px)
  padding 0 25px
  .toolbar
    // flex 1
    display flex
    align-items center
    width 60%
    justify-content flex-end
    // overflow hidden
  .layout_head
    display flex
    align-items center
    justify-content space-between
    height 100%
    > img
      height 70%
      vertical-align middle
    .lang
      color #666
      position relative
      text-align right
      font-size 32px
      .inner-ul li
        padding 10px 20px
      .ubox
        box()
        width 190px
        right 0
    .uname
      color #666
      width 70%
      position relative
      line-height normal
      text-align right
      // overflow hidden
      margin-right 15px
      padding-left 35px
      span
        display block
        overflow hidden
        text-overflow ellipsis
      .ubox
        box()
        bottom calc(-100% - 40px)
        padding 10px 20px
        font-size 30px
</style>
