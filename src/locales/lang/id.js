export default {
  btnGroup: {
    signin: 'Masuk',
    signup: 'Daftar',
    logout: 'Keluar',
    send: 'Kirim',
    download: 'unduh',
    apply: 'melamar'
  },
  head: {
    0: {
      title: 'Persyaratan Jangkar',
      part: ['Ingin menjadi bintang pertunjukan?', 'Ingin ratusan juta penggemar?', 'Kami mencari Anda yang serba bisa.'],
      part1: ['Tidak ada persyaratan.', 'Keterbatasan waktu', 'Perbarui dinamika tepat waktu']
    },
    1: {
      title: 'Pendaftaran Tuan Rumah',
      part: ['Anda bisa menjadi Anchor dengan mengikuti langkah-langkah di bawah ini.']
    },
    2: {
      title: 'Pengenalan Aplikasi',
      part: ['Perangkat lunak obrolan satu-satu yang populer, Slapchat, akan datang, yang pertama menjadi jangkar achat untuk menghasilkan banyak uang.']
    },
    3: {
      title: 'Unduh dan layanan pelanggan',
      part: ['Anda dapat mengunduh Slapchat frim Gogle dan mengautentikasi sebagai tuan rumah.Jika Anda memiliki pertanyaan, silakan hubungi layanan pelanggan Whatsapp.']
    }
  },
  form: {
    title: 'Ajukan permohonan jangkar',
    type: ["surel", "telepon"],
    gender: ['Perempuan', 'pria'],
    login: {
      title: 'Masuk',
      sendTo: 'surel atau Telepon',
      upass: 'kata sandi',
      label: 'Daftar',
      format: {
        upass: {
          valid: 'Kata sandi harus memiliki setidaknya 6 karakter'
        },
        usex: {
          required: 'Pilih jenis kelamin'
        }
      },
      tips: {
        required: 'Silakan masukkan akun dan kata sandi Anda',
        success: 'Login berhasil'
      }
    },
    signup: {
      title: 'Daftar',
      phonecode: 'Kode Negara Telepon',
      link: 'Sudah memiliki akun?',
      email: 'surel',
      code: 'Kode verifikasi',
      phone: 'telepon',
      upass: 'kata sandi',
      usex: 'jenis kelamin',
      format: {
        phone: {
          required: 'Silakan masukkan telepon Anda',
          valid: 'Kesalahan format telepon'
        },
        mail: {
          required: 'Silakan masukkan email Anda',
          valid: 'Harap periksa format email'
        },
        code: {
          required: 'Silahkan isi kode verifikasi'
        }
      }
    },
    upload: {
      photo: {
        txt: 'foto',
        prompt: 'Pilih file gambar',
        tips: 'Anda perlu menyediakan 3-6 foto'
      },
      video: {
        txt: 'Video',
        prompt: 'Pilih file video',
        tips: 'Anda perlu memberikan video'
      },
      audio: {
        txt: 'Audio',
        prompt: 'Pilih file audio',
        tips: 'Anda perlu memberikan suara'
      },
      tips: {
        max: 'Anda memilih > {maxSize}MB file'
      }
    }
  },
  tips: {
    switchSuc: 'Ganti Sukses',
    repeat1: 'Anda telah mengajukan permohonan untuk jangkar',
    repeat: '@:tips.repeat1, pindah ke aplikasi untuk melihat lebih banyak',
    toLogin: 'Silahkan masuk terlebih dahulu',
    codewait: 'Tolong operasikan dalam 1 menit',
    wait: 'Mengirim, harap tunggu...',
  },
  statusCode: {
    200: "Permintaan berhasil",
    4001: "Kode verifikasi belum kedaluwarsa",
    4002: "Kode verifikasi telah kedaluwarsa",
    4003: "Kesalahan kode verifikasi, harap masukkan kembali",
    4004: "Kesalahan alamat email",
    4005: "Pendaftaran gagal, silakan hubungi kami",
    4006: "Akun tersebut belum masuk",
    4007: "File upload failed",
    4031: "Unggahan file gagal",
    4032: "Kesalahan akun",
    4035: "Token tidak valid",
    4036: "Kesalahan token",
    4038: "kata sandi salah",
    4044: "Anda telah berhasil membuat koneksi",
    4049: "Kotak surat tidak tersedia",
    4091: "Akun sudah ada"
  }
}
