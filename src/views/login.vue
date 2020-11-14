<template>
  <form class="regAccount" @keyup.13="logAccount()">
    <h3>{{ $t("btnGroup.signin") }}</h3>
    <div class="form_item">
      <div class="form_icon account">
        <input
          type="text"
          v-model="uAccount.sendTo"
          autocomplete="sendTo"
          :placeholder="$t('form.login.sendTo')"
        />
        <!-- :class="{ error: emailStatus.password }" -->
      </div>
    </div>
    <div class="form_item">
      <div class="form_icon password">
        <input
          type="password"
          v-model="uAccount.upass"
          autocomplete="upass"
          :placeholder="$t('form.login.upass')"
        />
        <!-- :class="{ error: emailStatus.password }" -->
      </div>
    </div>
    <h5 class="link_span" @click="$bus.$emit('showLogin', false)">
      {{ $t("form.login.label") }}
    </h5>
    <cube-button type="button" class="login_btn" @click="logAccount()">{{
      $t("btnGroup.signin")
    }}</cube-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      // login
      isLogin: false,
      uAccount: {
        sendTo: "",
        upass: ""
      }
      // emailStatus: {
      //   email: false,
      //   ecode: false,
      //   password: false
      // }
    }
  },
  methods: {
    // login
    logAccount(param) {
      if (this.isLogin) {
        console.log("please wait")
        return
      }
      if (!param || typeof param != "object") {
        param = this.uAccount
      }
      if (!param.sendTo || !param.upass) {
        this.$util.showToast(this.$t("form.login.tips.required"), "warn")
        return
      }
      this.isLogin = true
      this.$util.showToast({
        txt: this.$t("tips.wait"),
        time: 0,
        type: "loading",
        mask: true
      })
      this.$axios
        .postData("toLogin", param)
        .then((res) => {
          this.isLogin = false
          if (res.code == 200) {
            var d = res.data
            if (d.utype == 3) {
              this.$bus.$emit("showResult", true)
              this.$util.showToast(this.$t("tips.repeat1"))
              return
            }
            this.$util.showToast("Login Successful")
            this.$parent.checkApply(d)
          }
          // this.nextPage()
        })
        .catch((err) => {
          this.isLogin = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
