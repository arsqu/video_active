<template>
  <div class="layout_box">
    <div class="layout_item">
      <div class="layout_text">Anchor Requirements</div>
      <div class="layout_desc">
        <p>Want to be the star of the show?</p>
        <p>Want hundreds of millions of fans?</p>
        <p>We are looking for the versatile you.</p>
        <div class="layout_content">
          <img src="~@assets/image/avatar.png" />
          <div class="layout_content_item">
            <p>No requirements.</p>
            <p>Time freedom.</p>
            <p>Update the dynamic in time.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="layout_item">
      <div class="layout_text">Host Registration</div>
      <div class="layout_desc1">
        <p>
          You can become an Anchor by following the steps below.
        </p>
      </div>
    </div>
    <!-- form box -->
    <div class="layout_result" v-show="showResult">
      <i class="cubeic-smile"></i>
      <p>You are already an anchor, go to the app to see more</p>
      <p>
        <a
          href="https://play.google.com/store/apps/details?id=com.shi.xulin.livevideo"
          >download now</a
        >
      </p>
    </div>
    <div class="layout_register" v-show="!showResult">
      <h5>// Apply for anchor //</h5>
      <!-- class="disabled" -->
      <!-- login box -->
      <div v-show="showLogin">
        <form class="regAccount" @keyup.13="logAccount()">
          <h3>Sign in</h3>
          <div class="form_item">
            <div class="form_icon account">
              <input
                type="text"
                v-model="uAccount.sendTo"
                autocomplete="sendTo"
                :class="{ error: emailStatus.password }"
                placeholder="Email or phone"
              />
            </div>
          </div>
          <div class="form_item">
            <div class="form_icon password">
              <input
                type="password"
                v-model="uAccount.upass"
                autocomplete="sendTo"
                :class="{ error: emailStatus.password }"
                placeholder="password"
              />
            </div>
          </div>
          <h5 class="link_span" @click="showLogin = false">
            Create One
          </h5>
          <cube-button type="button" class="login_btn" @click="logAccount()"
            >Sign in</cube-button
          >
        </form>
      </div>
      <div v-show="!showLogin">
        <!-- <cube-slide
          ref="BScroll"
          :loop="false"
          :auto-play="false"
          :options="{ stopPropagation: false, }"
          :showDots="false"
          :data="[]"
        > -->
        <!-- register -->
        <!-- <cube-slide-item> -->
        <form class="regAccount" @keyup.13="regAccount" v-show="!showUpload">
          <h3>Sign up</h3>
          <h5 class="link_span text-center" @click="showLogin = true">
            Already have an account?
          </h5>
          <div v-show="!type">
            <div class="form_item">
              <div class="form_icon OTP email">
                <input
                  type="text"
                  v-model="email"
                  placeholder="email"
                  autocomplete="email"
                  :class="['code', { error: emailStatus.email }]"
                />
                <span :class="[showValidEmail ? '' : 'valid']" @click="getMail">
                  <a href="javascript:;" v-show="showValidEmail">Send</a>
                  <a href="javascript:;" v-show="timeValidEmail">{{
                    timeLast
                  }}</a>
                </span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_icon ecode">
                <input
                  type="text"
                  v-model="ecode"
                  placeholder="Verification code"
                  :class="{ error: emailStatus.ecode }"
                />
              </div>
            </div>
          </div>
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
                  placeholder="phone"
                  autocomplete="phone"
                />
                <span
                  :class="[showValidPhone ? '' : 'valid']"
                  @click="getPhone"
                >
                  <a href="javascript:;" v-show="showValidPhone">Send</a>
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
                  placeholder="Verification code"
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
                :class="{ error: emailStatus.password }"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="form_item">
            <div class="form_icon gender">
              <input
                readonly
                placeholder="Gender"
                @click="showPicker"
                :value="usex"
              />
            </div>
          </div>
          <h5 class="link_span" @click="toggleType">
            {{ this.regLabel[type == 0 ? 1 : 0] }} instead
          </h5>
          <cube-button type="button" class="login_btn" @click="regAccount"
            >Sign up</cube-button
          >
        </form>
        <!-- </cube-slide-item> -->
        <!-- 上传组件 -->
        <!-- <cube-slide-item> -->
        <!-- <div v-for="(file, i) in fileSize.video" :file="file" :key="i">
          <p>{{ file }}</p>
        </div> -->
        <form class="regAnchor" @keyup.13="regAnchor" v-show="showUpload">
          <div class="form_item form_txt">
            <h3>Photo</h3>
            <p>You need to provide 3-6 photos <span>(&lt;5MB)</span>.</p>
          </div>
          <div class="form_item">
            <!-- :simultaneous-uploads="maxSize.photo.limit" -->
            <cube-upload
              :action="maxSize.photo.action"
              :max="maxSize.photo.max"
              :auto="false"
              @file-click="
                (files) => {
                  fileReview(files, 'photo')
                }
              "
              @files-added="
                (files) => {
                  filesAdded(files, 'photo')
                }
              "
              @input="
                (files) => {
                  filesChange(files, 'photo')
                }
              "
            />
          </div>
          <div class="form_item form_txt">
            <h3>Video</h3>
            <p>You need to provide a video <span>(&lt;20MB)</span>.</p>
          </div>
          <div class="form_item">
            <!-- :simultaneous-uploads="maxSize.video.limit" -->
            <!-- :multiple="maxSize.video.multi"
              :accept="maxSize.video.accept" -->
            <cube-upload
              :action="maxSize.video.action"
              :auto="false"
              ref="uploadvideo"
              :max="maxSize.video.max"
              @input="
                (files) => {
                  filesChange(files, 'video')
                }
              "
              @files-added="
                (files) => {
                  filesAdded(files, 'video')
                }
              "
            >
              <cube-upload-btn
                :multiple="maxSize.video.multi"
                :max="maxSize.video.max"
                :accept="maxSize.video.accept"
              >
              </cube-upload-btn>
              <cube-upload-file
                v-for="(file, i) in fileSize.video"
                :file="file"
                :key="i"
              >
                <a class="link_txt" href="javascript:;" target="blank">{{
                  file.name
                }}</a>
                <!-- <video class="w-100" :src="file.url" controls></video> -->
              </cube-upload-file>
            </cube-upload>
          </div>
          <div class="form_item form_txt">
            <h3>Audio</h3>
            <p>You need to provide a voice <span>(&lt;10MB)</span></p>
          </div>
          <div class="form_item">
            <!-- :simultaneous-uploads="maxSize.audio.limit" -->
            <cube-upload
              :action="maxSize.audio.action"
              :auto="false"
              ref="uploadaudio"
              :max="maxSize.audio.max"
              @input="
                (files) => {
                  filesChange(files, 'audio')
                }
              "
              @files-added="
                (files) => {
                  filesAdded(files, 'audio')
                }
              "
            >
              <cube-upload-btn
                :multiple="maxSize.audio.multi"
                :accept="maxSize.audio.accept"
              >
                <img
                  class="w-100"
                  src="~@assets/image/audio.png"
                  alt="choose audio"
                />
              </cube-upload-btn>
              <cube-upload-file
                v-for="(file, i) in fileSize.audio"
                :file="file"
                :key="i"
              >
                <audio class="w-100" :src="file.url" controls></audio>
              </cube-upload-file>
            </cube-upload>
          </div>
          <cube-button type="button" class="login_btn" @click="regAnchor"
            >Apply</cube-button
          >
        </form>
        <!-- </cube-slide-item> -->
        <!-- </cube-slide> -->
      </div>
    </div>
    <div class="layout_item">
      <div class="layout_text">Application Introduction</div>
      <div class="layout_desc1">
        <p>
          Popular one-on-one chat software slapchat is coming,the first to
          become a chat anchor to earn a lot of money.
        </p>
      </div>
    </div>
    <div class="layout_item">
      <div class="layout_text">Download and customer service</div>
      <div class="layout_desc1">
        <p>
          You can download slapchat from Google and authenticate as the host.If
          you have any questions, please contact WhatsApp customer service.
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
  </div>
</template>

<script>
import Qs from "qs"
import phoneCode from "@util/phoneCode"
import statusCode from "@util/statusCode"

export default {
  name: "Home",
  data() {
    return {
      /******* form *******/
      // login
      isLogin: false,
      showResult: false,
      uAccount: {
        sendTo: "",
        upass: ""
      },
      showUpload: false,
      showLogin: false,
      // upload
      maxSize: {
        photo: {
          action: "",
          fileName: "files",
          max: 6,
          maxSize: 5,
          limit: 1
        },
        video: {
          action: "",
          fileName: "video",
          accept: "video/*",
          max: 1,
          maxSize: 20,
          limit: 1,
          multi: false
        },
        audio: {
          action: "",
          fileName: "voice",
          accept: "audio/*",
          max: 1,
          maxSize: 10,
          limit: 1,
          multi: false
        }
      },
      fileSize: {
        photo: [],
        video: [],
        audio: []
      },
      slide: null,
      phoneCode,
      statusCode,
      regLabel: ["Email", "Phone"],
      type: 0, // 0 邮箱(默认) 1 手机
      toRegister: false, // 注册状态
      showValidEmail: true, // 邮箱验证
      timeValidEmail: false,
      showValidPhone: true, // 手机验证
      timeValidPhone: false,
      usex: "",
      genderI18n: [
        { text: "female", value: "0" },
        { text: "male", value: "1" }
        // { text: "other", value: "2" }
      ],
      timeLast: "",
      phoneTimeLast: "", //手机验证码剩余时间
      upass: "",
      phone: "",
      pTimer: null,
      email: "",
      ecode: "", //邮箱码
      pecode: "", // 手机码
      timer: null,
      /* common */
      upass: "",
      defPhone: "91",
      emailStatus: {
        email: false,
        ecode: false,
        password: false
      },
      toast: null,
      picker: null,
      phonePicker: null
    }
  },
  mounted() {
    this.$nextTick((_) => {
      // 关闭用户手势
      // this.slide = this.$refs.BScroll.slide
      // this.slide.disable()
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
      // this.slide.enabled = false
      // console.log(this.slide)
    })
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
        this.$util.showToast("Please enter your account and password", "warn")
        return
      }
      this.isLogin = true
      this.$util.showToast({
        txt: "Submitting, please wait...",
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
              this.showResult = true
              this.$util.showToast(
                "You are already an anchor, go to the app to see more"
              )
              return
            }
            this.$util.showToast("Login Successful")
            this.checkApply(d)
          }
          // this.nextPage()
        })
        .catch((err) => {
          this.isLogin = false
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
            this.$util.showToast(
              "You are already an anchor, go to the app to see more"
            )
          } else {
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
        this.$util.showToast("Please login first", "warn")
        this.$util.clearCache()
        return
      }
      if (this.getDate() - sT > 60 * 60 * 1e3) {
        this.$util.clearCache()
        this.$util.showToast("Please login first", "warn")
        return
      }
      if (localStorage.getItem("isApply")) {
        return "isApply"
      }
      return true
    },
    fileReview(files, key) {
      if (key == "photo") {
        this.$createImagePreview({
          imgs: [files.url]
        }).show()
      }
    },
    // file change
    filesChange(files, key) {
      this.fileSize[key] = files
      console.log(files)
      console.log(this.fileSize)
    },
    // filter file
    filesAdded(files, key) {
      var maxSize = this.maxSize[key].maxSize
      var rules = {
        photo: {
          fileType: "image",
          tips: "Please select image files"
        },
        video: {
          fileType: "video",
          tips: "Please select a video file"
        },
        audio: {
          fileType: "audio",
          tips: "Please select a audio file"
        }
      }
      // file type
      for (var i = 0; i < files.length; i++) {
        if (files[i] && files[i].type.indexOf(rules[key].fileType) == -1) {
          const file = files[i]
          file.ignore = true
          this.$util.showToast(rules[key].tips, "warn")
          return
        }
      }
      console.log(files)
      // file size
      for (var i = 0; i < files.length; i++) {
        const file = files[i]
        console.log(file)
        if (file.size > maxSize * 1024 * 1024) {
          file.ignore = true
          this.$util.showToast(`You selected >${maxSize}M files`, "warn")
          return
        }
      }
      // 视频音频处理
      if (key != "photo") {
        const specFile = this.fileSize[key]
        specFile && this.$refs["upload" + key].removeFile(specFile)
      }
      console.log(this.fileSize)
      // this.fileSize[key] = files
    },
    nextPage() {
      this.slide && this.slide.next()
      this.slide.disable()
    },
    prevPage() {
      this.slide && this.slide.prev()
    },
    // 性别
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "Picker",
          data: [this.genderI18n],
          onSelect: this.selectHandle
        })
      }
      this.picker.show()
    },
    // 手机区号
    showPhonePicker() {
      if (!this.phonePicker) {
        this.phonePicker = this.$createPicker({
          title: "Phone Country Code",
          data: [this.phoneCode],
          onSelect: this.selPhoneCode
        })
      }
      this.phonePicker.show()
    },
    // callback
    selPhoneCode(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      this.defPhone = selectedVal[0]
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      this.usex = selectedText
    },
    //注册方式
    toggleType() {
      this.type = !this.type ? 1 : 0
    },
    getCode() {
      var type = this.type
      var opt = {}
      if (!this.type) {
        // opt.mail = this.email
        opt.sendTo = this.email
        // opt.type = "mail"
      } else {
        opt.sendTo = this.defPhone + this.phone
        // opt.ph = this.defPhone + this.phone
        // opt.type = "ph"
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
            this.$util.showToast(statusCode[200], "correct")
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
      var reg = /^\d+$/ //手机格式
      if (!this.phone) {
        this.$util.showToast("Please fill in the phone number")
        return
      }
      if (!reg.test(this.phone)) {
        this.$util.showToast("Phone format error")
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
      }, 1000)
    },
    getType(v) {
      return Object.prototype.toString.call(v)
    },
    clearData() {
      console.log("清除数据")
    },
    //邮箱验证码
    getMail() {
      var time = 60
      if (this.timeValidEmail) {
        console.log("无法点击")
        this.$util.showToast("Please operate in 1 minutee")
        return
      }
      if (!this.email) {
        this.$util.showToast("Please fill in the email", "error")
        return
      }
      if (this.email.indexOf("@") == -1) {
        this.$util.showToast("Please check if the email format", "error")
        return
      }
      // var reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/ //邮箱格式
      // if (!this.email || !reg.test(this.email)) {
      //   this.$util.showToast("邮箱验证失败")
      //   return
      // }
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
    getDate() {
      var d = new Date().getTime()
      return d
      // return (
      //   d.getFullYear() + "" + (d.getMonth() + 1) + d.getDate() // + d.getHours()
      // )
    },
    // 主播申请
    regAnchor() {
      if (this.applyState) {
        console.log("please wait")
        return
      }
      var formdata = new FormData()
      var uid = localStorage.getItem(this.$util.encryKey("uid"))
      if (!this.checkState()) {
        // this.$util.showToast("Please login first", "warn")
        this.showUpload = false
        // this.prevPage()
        return
      }
      this.$util.hideToast()
      uid = this.$util.decryKey(uid)
      var reg = /^\d+$/
      uid = uid.split("&")[1]
      formdata.append("userId", uid)
      var files = this.fileSize
      var arr = ["photo", "video", "audio"]
      for (var i = 0; i < arr.length; i++) {
        if (!files[arr[i]] || files[arr[i]].length == 0) {
          this.$util.showToast(`Please provide your ${arr[i]}`)
          return
        }
      }
      for (var k in files) {
        for (var i = 0; i < files[k].length; i++) {
          if (files[k][i] && files[k][i].size > 0) {
            formdata.append(this.maxSize[k].fileName, files[k][i].file)
          } else {
            return
          }
        }
      }
      var token = localStorage.getItem(this.$util.encryKey("token"))
      this.applyState = true
      this.$util.showToast({
        txt: "Submitting, please wait...",
        time: 0,
        type: "loading",
        mask: true
      })
      this.$axios
        .postFile("uploadFile", formdata, {
          headers: {
            Authorizations: this.$util.decryKey(token)
          }
        })
        .then((res) => {
          this.applyState = false
          if (res.code == 200) {
            localStorage.setItem("isApply", 1) // 申请中
            this.$util.showToast(statusCode[200], "correct")
            this.showResult = true
          }
          console.log(res)
        })
        .catch((err) => {
          this.applyState = false
        })
      console.log("申请成为主播")
    },
    //注册
    regAccount() {
      // 测试信息
      // this.nextPage()
      if (this.toRegister) {
        console.log("请等待")
        return
      }
      this.$util.hideToast()
      // type 0 邮箱 1 手机
      if (this.type == 0) {
        if (!this.email) {
          this.$util.showToast("Please input your email", "error")
          return
        }
        // var reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/ //邮箱格式
        // if (!reg.test(this.email)) {
        if (this.email.indexOf("@") == -1) {
          this.$util.showToast("Please check if the email format", "error")
          return
        }
        if (!this.ecode) {
          this.$util.showToast("Please fill in the verification code", "error")
          // console.log("没有填邮件码")
          return
        }
      } else {
        if (!this.phone) {
          this.$util.showToast("Please enter phone number", "error")
          return
        }
        if (!this.pecode) {
          this.$util.showToast("Please fill in the verification code", "error")
          return
        }
        //手机码
        var reg = /^\d+$/ //手机格式
        if (!reg.test(this.phone)) {
          console.log("手机验证失败")
          this.$util.showToast("Phone format verification failed", "error")
          return
        }
      }
      if (!this.upass || this.upass.length < 6) {
        console.log("必填")
        this.$util.showToast(
          "Passwords must have at least 6 characters",
          "error"
        )
        return
      }
      if (!this.usex) {
        this.$util.showToast("Please select gender", "error")
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
        // opt.mail = this.email
        // opt.type = "mail"
        opt.sendTo = this.email
        opt.code = this.ecode
      } else {
        // opt.ph = this.defPhone + this.phone
        // opt.type = "ph"
        opt.sendTo = this.defPhone + this.phone
        opt.code = this.pecode
      }
      this.toRegister = true
      this.$util.showToast({
        txt: "Submitting, please wait...",
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
            this.cacheData(d)
            this.$util.showToast(statusCode[200], "correct")
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

<style lang="stylus" scoped>
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
