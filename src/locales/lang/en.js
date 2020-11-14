export default {
  btnGroup: {
    signin: 'Sign in',
    signup: 'Sign up',
    logout: 'Log Out',
    send: 'Send',
    download: 'download',
    apply: 'Apply'
  },
  head: {
    0: {
      title: 'Anchor Requirements',
      part: ['Want to be the star of the show?', 'Want hundreds of millions of fans?', 'We are looking for the versatile you.'],
      part1: ['No requirements.', 'ime freedom.', 'Update the dynamic in time.']
    },
    1: {
      title: 'Host Registration',
      part: ['You can become an Anchor by following the steps below.']
    },
    2: {
      title: 'Application Introduction',
      part: ['Popular one-on-one chat software slapchat is coming,the first to become a chat anchor to earn a lot of money.']
    },
    3: {
      title: 'Download and customer service',
      part: ['You can download slapchat from Google and authenticate as the host.If you have any questions, please contact WhatsApp customer service.']
    }
  },
  form: {
    title: 'Apply for anchor',
    type: ["Email", "Phone"],
    gender: ['Female', 'Male'],
    login: {
      title: 'Sign in',
      sendTo: 'Email or phone',
      upass: 'password',
      label: 'Create One',
      format: {
        upass: {
          valid: 'Passwords must have at least 6 characters'
        },
        usex: {
          required: 'Please select gender'
        }
      },
      tips: {
        required: 'Please enter your account and password',
        success: 'Login Successful'
      }
    },
    signup: {
      title: 'Sign up',
      phonecode: 'Phone Country Code',
      link: 'Already have an account?',
      email: 'email',
      code: 'Verification code',
      phone: 'phone',
      upass: 'password',
      usex: 'Gender',
      label: '{type} instead',
      format: {
        phone: {
          required: 'Please input your phone',
          valid: 'Phone format error'
        },
        mail: {
          required: 'Please input your email',
          valid: 'Please check email format'
        },
        code: {
          required: 'Please fill in the verification code'
        }
      }
    },
    upload: {
      photo: {
        txt: 'Photo',
        prompt: 'Please select image files',
        tips: 'You need to provide 3-6 photos'
      },
      video: {
        txt: 'Video',
        prompt: 'Please select a video file',
        tips: 'You need to provide a video'
      },
      audio: {
        txt: 'Audio',
        prompt: 'Please select a audio file',
        tips: 'You need to provide a voice'
      },
      tips: {
        max: 'You selected >{maxSize}M files'
      }
    }
  },
  tips: {
    switchSuc: 'Switch Success',
    repeat1: 'You have already applied for the anchor',
    repeat: '@:tips.repeat1, move to the app to see more',
    toLogin: 'Please login first',
    codewait: 'Please operate in 1 minutes',
    wait: 'Submitting, please wait...',
  },
  statusCode: {
    200: "Request successful",
    4001: "The verification code has not expired",
    4002: "Verification code has expired",
    4003: "Verification code error, please re-enter",
    4004: "Email address error",
    4005: "Registration failed, please contact us",
    4006: "The account is not logged in",
    4007: "File upload failed",
    4031: "The account is not registered",
    4032: "Account error",
    4035: "Token invalid",
    4036: "Token error",
    4038: "wrong password",
    4044: "You have successfully established a connection",
    4049: "The mailbox is not available",
    4091: "Account already exists"
  }
}
