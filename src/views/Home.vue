<template>
  <div class="layout_box">
    <div class="layout_item">
      <div class="layout_text">{{ $t("head[0].title") }}</div>
      <div class="layout_desc">
        <p>{{ $t("head[0].part[0]") }}</p>
        <p>{{ $t("head[0].part[1]") }}</p>
        <p>{{ $t("head[0].part[2]") }}</p>
        <div class="layout_content">
          <img src="~@assets/image/avatar.png" />
          <div class="layout_content_item">
            <p>{{ $t("head[0].part1[0]") }}</p>
            <p>{{ $t("head[0].part1[1]") }}</p>
            <p>{{ $t("head[0].part1[2]") }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="layout_item">
      <div class="layout_text">{{ $t("head[1].title") }}</div>
      <div class="layout_desc1">
        <p>
          {{ $t("head[1].part[0]") }}
        </p>
      </div>
    </div>
    <!-- form box -->
    <div class="layout_result" v-show="showResult">
      <i class="cubeic-smile"></i>
      <p>{{ $t("tips.repeat") }}</p>
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.shi.xulin.livevideo"
          >{{ $t("btnGroup.download") }}</a
        >
      </p>
    </div>
    <div class="layout_register" v-show="!showResult">
      <h5>// {{ $t("form.title") }} //</h5>
      <!-- 登录 -->
      <div v-show="showLogin">
        <login />
      </div>
      <div v-show="!showLogin">
        <!-- 注册 -->
        <register v-show="!showUpload" />
        <!-- 申请主播 -->
        <anchor v-show="showUpload" />
      </div>
    </div>
    <div class="layout_item">
      <div class="layout_text">{{ $t("head[2].title") }}</div>
      <div class="layout_desc1">
        <p>
          {{ $t("head[2].part[0]") }}
        </p>
      </div>
    </div>
    <div class="layout_item">
      <div class="layout_text">{{ $t("head[3].title") }}</div>
      <div class="layout_desc1">
        <p>
          {{ $t("head[3].part[0]") }}
        </p>
      </div>
    </div>
    <div class="layout_download">
      <img src="~@assets/image/phone.png" alt="phone" />
      <div class="layout_img_box">
        <a
          href="https://play.google.com/store/apps/details?id=com.shi.xulin.livevideo"
          ><img src="~@assets/image/android.png" alt="download app"
        /></a>
        <a href="https://api.whatsapp.com/send?phone=+6591361648">
          <img src="~@assets/image/service.png" alt="WhatsApp" />
        </a>
      </div>
    </div>
    <a
      href="https://chat.whatsapp.com/I6eoQ8keFjQ3sNKJuXjw6M"
      class="whatsapp"
    ></a>
  </div>
</template>

<script>
// import statusCode from "@util/statusCode"
const login = () => import("./login")
const register = () => import("./register")
const anchor = () => import("./anchor")

export default {
  name: "Home",
  components: {
    login,
    register,
    anchor
  },
  data() {
    return {
      showResult: false,
      showUpload: false,
      showLogin: false
      // statusCode
    }
  },
  mounted() {
    this.getMsg()
    this.$nextTick((_) => {
      // 关闭用户手势
      var sta = this.checkState()
      if (sta == "isApply") {
        // this.showLogin = true
        this.showResult = true
        // this.nextPage()
      } else if (sta) {
        this.showLogin = false
        this.showUpload = true
      } else {
      }
    })
  },
  methods: {
    getMsg() {
      this.$bus.$on("showResult", (res) => {
        this.showResult = res
      })
      this.$bus.$on("showLogin", (res) => {
        this.showLogin = res
      })
      this.$bus.$on("showUpload", (res) => {
        this.showUpload = res
      })
    },
    // 检查是否申请过主播
    checkApply(d) {
      this.$axios
        .postData(
          "checkApply",
          {
            condition: {
              condition: {
                uid: d.id
              }
            }
          },
          {
            headers: {
              Authorizations: d.token
            }
          }
        )
        .then((res) => {
          if (res.code == 200 && res.data.records.length > 0) {
            this.showResult = true
            localStorage.setItem("isApply", 1)
            this.$util.showToast(this.$t("tips.repeat1"))
          } else {
            console.log("用户上传")
            this.showLogin = false
            this.showUpload = true
          }
          this.cacheData(d)
          console.log(res)
        })
    },
    // 检查登录状态
    checkState() {
      var uid = localStorage.getItem(this.$util.encryKey("uid")),
        token = localStorage.getItem(this.$util.encryKey("token"))
      if (!uid || !token) {
        // this.$util.showToast("Please login first", "warn")
        return
      }
      uid = this.$util.decryKey(uid)
      var reg = /^\d+$/
      var sT = uid.split("&")[0]
      if (!sT || !reg.test(sT)) {
        this.$util.showToast(this.$t("tips.toLogin"), "warn")
        this.$util.clearCache()
        return
      }
      if (this.getDate() - sT > 60 * 60 * 1e3) {
        this.$util.showToast(this.$t("tips.toLogin"), "warn")
        this.$util.clearCache()
        return
      }
      if (localStorage.getItem("isApply")) {
        return "isApply"
      }
      return true
    },
    getDate() {
      var d = new Date().getTime()
      return d
    },
    cacheData(d) {
      var l = localStorage
      l.setItem(
        this.$util.encryKey("uid"),
        this.$util.encryKey(`${this.getDate()}&${d.id}`)
      )
      this.$bus.$emit("uname", {
        uname: d.uname
      })
      l.setItem(this.$util.encryKey("uname"), this.$util.encryKey(d.uname))
      l.setItem(this.$util.encryKey("token"), this.$util.encryKey(d.token))
    }
  }
}
</script>
<style lang="stylus">
// scoped
.text-center
  text-align center!important
.w-100
  width 100%
// reset-ui
.link_txt
  font-size 28px
  text-decoration underline
.layout_box
  & >>> .cube-upload-btn-def::after
    border-color #B3B3B3
.disabled.cube-slide
  pointer-events none
.link_span
  color #999
  text-decoration underline
  font-size 28px
  margin -15px 40px 30px 40px
  text-align right
.login_btn
  width calc(100% - 80px)
  background #FF5033
  font-size 30px
  margin 0 auto
.whatsapp
  position fixed
  right 10px
  top 50%
  z-index 100
  background url('~@assets/image/icon/whatsapp.png') no-repeat
  width 100px
  height 100px
  background-size cover
.layout_box
  .layout_result
    margin 0 20px
    border-radius 8px
    background #F8BE17
    padding-bottom 80px
    color #fff
    text-align center
    padding 40px 25px
    p
      width 80%
      line-height 1.2
      margin 20px auto 0
      text-align left
      &:last-child
        width auto
        display inline-block
        border-bottom 2px dashed #fff
        text-align center
        a
          color #fff
    i
      color #00E4A8
      margin 0 auto
      background #fff
      border-radius 50%
      padding 10px
      font-size 80px
  .layout_register
    margin 0 20px
    border-radius 8px
    background #F8BE17
    padding-bottom 80px
    & > h5
      width 60%
      margin 0 auto
      font-weight bold
      text-align center
      background #fff
      padding 25px 0
      border-radius 0 0 25px 25px
      color #FAA41D
  .layout_download
    display flex
    align-items center
    overflow hidden
    .layout_img_box
      margin-left calc(-20% + 15px)
      & img
        width calc(100% - 35px)
        margin-bottom 40px
    & > img
      width 65%
      height 100%

  .layout_item
    position relative
    margin 50px 0
    padding 0 35px
    .layout_text
      font-weight bold
      padding-bottom 25px
    &:after
      content ''
      display inline-block
      position absolute
      top -25px
      background #FAA219
      width 45px
      height 6px
    & .layout_desc1
      padding-left 60px
      position relative
      & > p
        color #b2b2b2
        line-height 1.3
      &:before
        content  ''
        display inline-block
        position absolute
        left 0
        top 0
        width 40px
        height 100%
        background url('~@assets/image/circle-line.png')no-repeat
        background-size cover
    & .layout_desc
      padding-left 60px
      position relative
      & > p
        color #F8BE19
        font-size 33px
        font-weight 700
        padding-bottom 15px
      &:after
        content  ''
        display inline-block
        position absolute
        left 0
        top 0
        width 40px
        height 100%
        background url('~@assets/image/circle-line.png')no-repeat
        background-size cover
      .layout_content
        display flex
        margin-top 25px
        img
          height 130px
          margin-right 50px
        p
          color #b2b2b2
          font-size 33px
          padding-bottom 15px
          position relative
          &:before
            content ""
            border-radius 50%
            position absolute
            width 14px
            height 14px
            top 50%
            margin-top -14px
            left -25px
            background #F7BD16
  .regAnchor
    margin 50px 20px 0 20px
    background #fff
    padding 50px 0
    border 1px solid transparent
    border-radius 15px
    .form_item
      padding 0 40px 10px 40px
      &.form_txt
        h3
          font-weight bold
          font-size 45px
        p
          margin 10px 0
          padding-left 20px
          font-size 32px
          color #b2b2b2
          position relative
          span
            color #de705e
            font-size 25px
          &:before
            content '*'
            font-size 30px
            color red
            display inline-block
            position absolute
            top 50%
            left 0
            transform translate(0%,-40%)
            display block
   // form box
  .regAccount
    margin 50px 20px 0 20px
    background #fff
    padding 50px 0
    border 1px solid transparent
    border-radius 15px
    > h3
      text-align center
      padding-bottom 30px
    .form_item
      height 80px
      margin 20px 40px
      margin-bottom 50px
      position relative
      .form_icon
        height 100%
        font-size 0
        position relative
        &.email:after
          right calc(30% + 15px)
        &.phone:after
          right calc(30% + 15px)
        &:before
          content ''
          width 40px
          height 40px
          display inline-block
          position absolute
          top 50%
          left 0
          margin-top -20px
          margin-left 20px
        &:after
          content '*'
          color red
          font-size 30px
          display inline-block
          position absolute
          top 50%
          right 15px
          transform translate(0%,-40%)
        &.OTP
          font-size 0
          a
            color #fff
        &.account:before
          background url('~@assets/image/icon/account.png')no-repeat center
          background-size contain
        &.email:before
          background url('~@assets/image/icon/mail.png')no-repeat center
          background-size contain
        &.phone:before
          content none
        &.ecode:before
          background url('~@assets/image/icon/code.png')no-repeat center
          background-size contain
        &.password:before
          background url('~@assets/image/icon/pass.png')no-repeat center
          background-size contain
        &.gender:before
          background url('~@assets/image/icon/gender.png')no-repeat center
          background-size contain
        &.phone input
          padding-left 100px
        .phoneCode
          width 80px
          display inline-block
          border-right 2px solid #e1e1e1
          height 100%
          font-size 26px
          font-weight bold
          font-style normal
          position absolute
          top 0
          left 0
          i
            position absolute
            color #999
            top 50%
            left 50%
            transform translate(-50%, -50%)
        &>span
          width 30%
          display inline-block
          height 100%
          line-height 80px
          border-radius 0 8px 8px 0
          font-size 28px
          text-align center
          background #FF5033
          word-break break-all
          vertical-align top
          &.valid
            background #ccc
          &.valid a
            color #fff
        input
          width 100%
          padding 0 15px
          border-radius 8px
          font-size 25px
          padding-left 80px
          height 100%
          outline 0 none
          color #999
          transition all .4s ease
          border 1px solid #e1e1e1
          // box-shadow 0 0 15px #ddd
          box-sizing border-box
          -webkit-appearance none
          &.code
            // border-radius 45px 0 0 45px
            box-sizing border-box
            width 70%
          img
            height 85px
            vertical-align middle
          // input:focus
            // box-shadow 0 0 15px #4bc461
</style>
