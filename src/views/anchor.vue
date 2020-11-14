<template>
  <form class="regAnchor" @keyup.13="regAnchor">
    <div class="form_item form_txt">
      <h3>{{ $t("form.upload.photo.txt") }}</h3>
      <p>{{ $t("form.upload.photo.tips") }} <span>(&lt;5MB)</span>.</p>
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
      <h3>{{ $t("form.upload.video.txt") }}</h3>
      <p>{{ $t("form.upload.video.prompt") }} <span>(&lt;20MB)</span>.</p>
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
      <h3>{{ $t("form.upload.audio.txt") }}</h3>
      <p>{{ $t("form.upload.audio.prompt") }} <span>(&lt;10MB)</span></p>
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
    <cube-button type="button" class="login_btn" @click="regAnchor">{{
      $t("btnGroup.apply")
    }}</cube-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      fileSize: {
        photo: [],
        video: [],
        audio: []
      },
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
      applyState: false // 申请状态
    }
  },
  methods: {
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
          tips: this.$t("form.upload.photo.prompt")
        },
        video: {
          fileType: "video",
          tips: this.$t("form.upload.video.prompt")
        },
        audio: {
          fileType: "audio",
          tips: this.$t("form.upload.audio.prompt")
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
          this.$util.showToast(
            this.$t("form.upload.tips.max", { maxSize }),
            "warn"
          )
          return
        }
      }
      // 音视频处理
      if (key != "photo") {
        const specFile = this.fileSize[key]
        specFile && this.$refs["upload" + key].removeFile(specFile)
      }
      // console.log(this.fileSize)
      // this.fileSize[key] = files
    },
    // 图片预览
    fileReview(files, key) {
      if (key == "photo") {
        this.$createImagePreview({
          imgs: [files.url]
        }).show()
      }
    },
    // 主播申请
    regAnchor() {
      if (this.applyState) {
        console.log("please wait")
        return
      }
      var formdata = new FormData()
      var uid = localStorage.getItem(this.$util.encryKey("uid"))
      if (!this.$parent.checkState()) {
        // this.$util.showToast("Please login first", "warn")
        this.$emit("showUpload", false)
        // this.prevPage()
        return
      }
      this.$util.hideToast()
      uid = this.$util.decryKey(uid)
      var reg = /^\d+$/
      uid = uid.split("&")[1]
      formdata.append("userId", uid) // 登录用户id
      var files = this.fileSize
      var arr = ["photo", "video", "audio"]
      for (var i = 0; i < arr.length; i++) {
        if (
          !files[arr[i]] ||
          files[arr[i]].length == 0 ||
          (arr[i] == "photo" && files[arr[i]].length < 3)
        ) {
          this.$util.showToast(this.$t(`form.upload${arr[i]}.tips`))
          // this.$util.showToast(`Please provide your ${arr[i]}`)
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
        txt: this.$t("tips.wait"),
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
            this.$util.showToast(this.$t(`statusCode.200`), "correct")
            this.$bus.$emit("showResult", true)
          }
          console.log(res)
        })
        .catch((err) => {
          this.applyState = false
        })
      console.log("申请成为主播")
    }
  }
}
</script>

<style></style>
