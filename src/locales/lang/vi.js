export default {
  btnGroup: {
    signin: 'đăng nhập',
    signup: 'Đăng ký',
    logout: 'đăng xuất',
    send: 'Gửi',
    download: 'Tải xuống',
    apply: 'áp dụng cho'
  },
  head: {
    0: {
      title: 'Yêu cầu streamer',
      part: ['Bạn có muốn trở thành minh tinh không ?', 'Bạn có muốn sở hữu trăm vạn người hâm mộ không ?', 'Chúng tôi chờ người đa tài đa nghệ như bạn'],
      part1: ['Không có bất kì yêu cầu nào', 'Thời gian tự do', 'Cập nhật tin tức kịp thời']
    },
    1: {
      title: 'Tạo tài khoản streamer',
      part: ['Bạn có thể trở thành Anchor bằng cách làm theo các bước dưới đây']
    },
    2: {
      title: 'Giới thiệu ứng dụng',
      part: ['Phần mềm trò chuyện một đối một phổ biến Slapchat sắp ra mắt, phần mềm đầu tiên trở thành Streamer để kiếm được nhiều tiền']
    },
    3: {
      title: 'Tải xuống và chăm sóc khách hàng',
      part: ['Bạn có thể tải xuống Slapchat từ Google và xác thực là máy chủ lưu trữ. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận chăm sóc khách hàng của Whatsapp.']
    }
  },
  form: {
    title: 'Xin phép làm streamer',
    type: ["Hộp thư", "điện thoại"],
    gender: ['Nữ', 'Nam'],
    login: {
      title: 'đăng nhập',
      sendTo: 'Hộp thư or điện thoại',
      upass: 'Mật khẩu',
      label: 'đăng ký',
      format: {
        upass: {
          valid: 'Mật khẩu phải có ít nhất 6 ký tự'
        },
        usex: {
          required: 'Vui lòng chọn giới tính'
        }
      },
      tips: {
        required: 'Vui lòng nhập tài khoản và mật khẩu của bạn',
        success: 'Đăng nhập thành công '
      }
    },
    signup: {
      title: 'Đăng ký',
      phonecode: 'Số điện thoại quốc gia ',
      link: 'Bạn đã có tài khoản chưa ?',
      email: 'hộp thư',
      code: 'Mã verify',
      phone: 'điện thoại',
      label: 'Chọn {type}',
      upass: 'Mật khẩu',
      usex: 'Giới tính',
      format: {
        phone: {
          required: 'Vui lòng nhập điện thoại của bạn',
          valid: 'Định dạng số điện thoại bị lỗi'
        },
        mail: {
          required: 'Vui lòng nhập email của bạn',
          valid: 'Vui lòng kiểm tra định dạng hộp thư'
        },
        code: {
          required: 'Vui lòng điền mã verify'
        }
      }
    },
    upload: {
      photo: {
        txt: 'Hình ảnh',
        prompt: 'Vui lòng chọn tệp hình ảnh',
        tips: 'Bạn cần phải cung cấp 3-6 tấm hình'
      },
      video: {
        txt: 'Video',
        prompt: 'Vui lòng chọn một tệp video',
        tips: 'Bạn cần phải cung cấp 1 đoạn âm thanh'
      },
      audio: {
        txt: 'Âm thanh',
        prompt: 'Vui lòng chọn một tệp âm thanh',
        tips: 'Bạn cần phải cung cấp 1 đoạn video'
      },
      tips: {
        max: 'Bạn đã chọn file tài liệu lớn hơn {maxSize}MB'
      }
    }
  },
  tips: {
    switchSuc: 'Chuyển đổi thành công',
    repeat1: 'Bạn đã đăng ký neo',
    repeat: '@:tips.repeat1, chuyển đến ứng dụng để xem thêm',
    toLogin: 'Vui lòng đăng nhập trước',
    codewait: 'Vui lòng đợi 1 phút sau đó thử lại',
    wait: 'Đang xác nhận, vui lòng đợi',
  },
  statusCode: {
    200: "Yêu cầu thành công",
    4001: "Mã verify vẫn chưa hết hạn",
    4002: "Mã verify đã hết hạn",
    4003: "Mã verify nhập sai",
    4004: "Sai địa chỉ hộp thư",
    4005: "Đăng kí thất bại, vui lòng liên hệ quản lý viên",
    4006: "Tài khoản chưa được đăng nhập",
    4007: "File tải lên thất bại",
    4031: "Tài khoản chưa được đăng ký",
    4032: "Sai tài khoản",
    4035: "Token hết hạn",
    4036: "Token bị lỗi",
    4038: "Sai mật khẩu",
    4044: "Bạn đã thiết lập kết nối thành công",
    4049: "Hộp thư không thể được sử dụng",
    4091: "tài khoản hộp thư"
  }
}
