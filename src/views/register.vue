<template>
  <form class="regAccount" @keyup.13="regAccount">
    <h3>{{ $t("btnGroup.signup") }}</h3>
    <h5 class="link_span text-center" @click="$bus.$emit('showLogin', true)">
      {{ $t("form.signup.link") }}
    </h5>
    <!-- 邮箱注册 -->
    <div v-show="!type">
      <div class="form_item">
        <div class="form_icon OTP email">
          <input
            type="text"
            v-model="email"
            autocomplete="email"
            :class="['code']"
            :placeholder="$t('form.signup.email')"
          />
          <!-- , { error: emailStatus.email } -->
          <span :class="[showValidEmail ? '' : 'valid']" @click="getMail">
            <a href="javascript:;" v-show="showValidEmail">{{
              $t("btnGroup.send")
            }}</a>
            <a href="javascript:;" v-show="timeValidEmail">{{ timeLast }}</a>
          </span>
        </div>
      </div>
      <div class="form_item">
        <div class="form_icon ecode">
          <input
            type="text"
            v-model="ecode"
            :placeholder="$t('form.signup.code')"
          />
          <!-- :class="{ error: emailStatus.ecode }" -->
        </div>
      </div>
    </div>
    <!-- 手机注册 -->
    <div v-show="type">
      <div class="form_item">
        <div class="form_icon OTP phone">
          <div class="phoneCode">
            <i @click="showPhonePicker">+{{ defPhone }}</i>
          </div>
          <input
            class="code"
            type="text"
            v-model="phone"
            :placeholder="$t('form.signup.phone')"
            autocomplete="phone"
          />
          <span :class="[showValidPhone ? '' : 'valid']" @click="getPhone">
            <a href="javascript:;" v-show="showValidPhone">{{
              $t("btnGroup.send")
            }}</a>
            <a href="javascript:;" v-show="timeValidPhone">{{
              phoneTimeLast
            }}</a>
          </span>
        </div>
      </div>
      <div class="form_item">
        <div class="form_icon ecode">
          <input
            type="text"
            v-model="pecode"
            autocomplete="pecode"
            :placeholder="$t('form.signup.code')"
          />
        </div>
      </div>
    </div>
    <div class="form_item">
      <div class="form_icon password">
        <input
          type="password"
          v-model="upass"
          autocomplete="password"
          :placeholder="$t('form.signup.upass')"
        />
        <!-- :class="{ error: emailStatus.password }" -->
      </div>
    </div>
    <div class="form_item">
      <div class="form_icon gender">
        <input
          readonly
          @click="showPicker"
          :value="usex"
          :placeholder="$t('form.signup.usex')"
        />
      </div>
    </div>
    <h5 class="link_span" @click="toggleType">
      {{ $t("form.signup.label", { type: this.regLabel[type == 0 ? 1 : 0] }) }}
    </h5>
    <cube-button type="button" class="login_btn" @click="regAccount">{{
      $t("btnGroup.signup")
    }}</cube-button>
  </form>
</template>

<script>
import phoneCode from "@util/phoneCode"
import Qs from "qs"

export default {
  data() {
    return {
      phoneCode,
      toRegister: false, // 注册状态
      picker: null,
      type: 0, // 0 邮箱(默认) 1 手机
      genderI18n: [
        { text: this.$t("form.gender[0]"), value: "0" },
        { text: this.$t("form.gender[1]"), value: "1" }
        // { text: "other", value: "2" }
      ],
      regLabel: [],
      email: "",
      phone: "",
      upass: "", // 密码
      usex: "",
      defPhone: "91",
      phonePicker: null,
      timeLast: "", // 邮箱验证码剩余时间
      phoneTimeLast: "", //手机验证码~
      ecode: "", //邮箱码
      pecode: "", // 手机码
      timer: null,
      pTimer: null,
      showValidEmail: true, // 邮箱验证
      timeValidEmail: false,
      showValidPhone: true, // 手机验证
      timeValidPhone: false
    }
  },
  mounted() {
    this.regLabel = this.$t("form.type")
  },
  methods: {
    // callback
    selPhoneCode(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      this.defPhone = selectedVal[0]
    },
    selGender(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      this.usex = selectedText
    },
    // 性别
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "Picker",
          data: [this.genderI18n],
          onSelect: this.selGender
        })
      }
      this.picker.show()
    },
    // 手机区号
    showPhonePicker() {
      if (!this.phonePicker) {
        this.phonePicker = this.$createPicker({
          title: this.$t("form.signup.phonecode"),
          data: [this.phoneCode],
          onSelect: this.selPhoneCode
        })
      }
      this.phonePicker.show()
    },
    //注册方式
    toggleType() {
      this.type = !this.type ? 1 : 0
    },
    // 校验表单
    validForm() {
      if (this.type == 0) {
        // 邮箱校验
        if (!this.email) {
          this.$util.showToast(
            this.$t("form.signup.format.mail.required"),
            "error"
          )
          return
        }
        // var reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/ //邮箱格式
        // if (!reg.test(this.email)) {
        //   this.$util.showToast("邮箱验证失败")
        //   return
        // }
        if (this.email.indexOf("@") == -1) {
          this.$util.showToast(
            this.$t("form.signup.format.mail.valid"),
            "error"
          )
          return
        }
      } else {
        // 手机校验
        if (!this.phone) {
          this.$util.showToast(
            this.$t("form.signup.format.phone.required"),
            "error"
          )
          return
        }
        var reg = /^\d+$/
        if (!reg.test(this.phone)) {
          this.$util.showToast(
            this.$t("form.signup.format.phone.valid"),
            "error"
          )
        }
      }
      return true
    },
    getCode() {
      var type = this.type
      var opt = {}
      if (!this.type) {
        opt.sendTo = this.email
      } else {
        opt.sendTo = this.defPhone + this.phone
      }
      this.$axios
        .postData("sendCode", Qs.stringify(opt), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.$util.showToast(this.$t("statusCode.200"), "correct")
          } else {
            // 邮箱注册时
            if (!this.type) {
              clearInterval(this.timer)
              this.showValidEmail = true
              this.timeValidEmail = false
            } else {
              clearInterval(this.pTimer)
              this.showValidPhone = true
              this.timeValidPhone = false
            }
          }
        })
        .catch((err) => {
          console.dir(err)
          if (!this.type) {
            // clearInterval(this.timer);
            // this.showValidEmail = true;
            // this.timeValidEmail = false;
          }
        })
    },
    //手机短信发送
    getPhone() {
      var time = 60
      if (this.timeValidPhone) {
        console.log("无法点击")
        return
      }
      if (!this.validForm()) {
        return
      }
      this.getCode()
      this.showValidPhone = false
      this.timeValidPhone = true
      this.pTimer && clearInterval(this.pTimer)
      this.phoneTimeLast = time + "s"
      this.pTimer = setInterval((_) => {
        time--
        this.phoneTimeLast = time + "s"
        if (time == -1) {
          clearInterval(this.pTimer)
          time = 60
          this.showValidPhone = true
          this.timeValidPhone = false
        }
      }, 1e3)
    },
    //邮箱验证码
    getMail() {
      var time = 60
      if (this.timeValidEmail) {
        console.log("无法点击")
        this.$util.showToast(this.$t("tips.codewait"), "error")
        return
      }
      if (!this.validForm()) {
        return
      }
      this.getCode()
      this.showValidEmail = false
      this.timeValidEmail = true
      this.timer && clearInterval(this.timer)
      this.timeLast = time + "s"
      this.timer = setInterval((_) => {
        time--
        this.timeLast = time + "s"
        if (time == -1) {
          clearInterval(this.timer)
          time = 60
          this.showValidEmail = true
          this.timeValidEmail = false
        }
      }, 1e3)
    },
    //注册
    regAccount() {
      // 测试信息
      if (this.toRegister) {
        console.log("请等待")
        return
      }
      this.$util.hideToast()
      if (!this.validForm()) {
        return
      }
      // type 0 邮箱 1 手机
      if (this.type == 0) {
        if (!this.ecode) {
          this.$util.showToast(
            this.$t("form.signup.format.code.required"),
            "error"
          )
          // console.log("没有填邮件码")
          return
        }
      } else {
        if (!this.pecode) {
          this.$util.showToast(
            this.$t("form.signup.format.code.required"),
            "error"
          )
          return
        }
      }
      if (!this.upass || this.upass.length < 6) {
        console.log("必填")
        this.$util.showToast(this.$t("form.login.format.upass.valid"), "error")
        return
      }
      if (!this.usex) {
        this.$util.showToast(
          this.$t("form.login.format.usex.required"),
          "error"
        )
        return
      }
      var opt = {
        upass: this.upass,
        chCode: "web"
      }
      this.genderI18n.filter((d) => {
        d.text == this.usex && (opt.usex = d.value)
      })
      if (this.type == 0) {
        opt.sendTo = this.email
        opt.code = this.ecode
      } else {
        opt.sendTo = this.defPhone + this.phone
        opt.code = this.pecode
      }
      this.toRegister = true
      this.$util.showToast({
        txt: this.$t("tips.wait"),
        time: 0,
        type: "loading",
        mask: true
      })
      this.$axios
        .postData("toRegister", opt)
        .then((res) => {
          console.log(res.code)
          if (res.code == 200) {
            var d = res.data
            this.$parent.cacheData(d)
            this.$util.showToast(this.$t("statusCode.200"), "correct")
            this.logAccount({
              sendTo: opt.sendTo,
              upass: opt.upass
            })
          }
          this.toRegister = false
        })
        .catch((err) => {
          this.toRegister = false
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
