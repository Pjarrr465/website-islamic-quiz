/* =====================================================
   DATA KUIS - file ini yang paling sering diedit.

   Tambah soal   : salin satu blok { id: ..., prompt: ... } di dalam "questions".
   Ganti jawaban : ubah angka "answer" (0 = pilihan pertama, 1 = kedua, dst).
   Ganti tulisan reaksi bintang : ubah bagian REACTIONS di bawah.
   ===================================================== */

const SETTINGS = {
  pointsPerCorrect: 100,   // poin untuk tiap jawaban benar (dihitung dari nilai TERBAIK tiap level)
  passStars: 3,            // level dianggap lulus jika dapat minimal 3 bintang
  usersKey: "islamic_quiz_users_v1",     // tempat menyimpan akun di browser
  sessionKey: "islamic_quiz_session_v1"  // tempat menyimpan siapa yang sedang login
};

// Reaksi sistem untuk nilai 1/5 sampai 5/5.
// confetti = jumlah kertas warna-warni yang jatuh (makin tinggi bintang, makin meriah)
const REACTIONS = {
  1: { title: "Ayo semangat!",         text: "Jangan menyerah ya. Baca penjelasannya lalu coba lagi!", confetti: 0 },
  2: { title: "Lumayan!",              text: "Sedikit lagi! Kamu pasti bisa lebih baik.",              confetti: 25 },
  3: { title: "Bagus!",                text: "Kamu sudah paham banyak. Terus belajar ya!",             confetti: 60 },
  4: { title: "Hebat sekali!",         text: "Alhamdulillah, hampir sempurna!",                        confetti: 110 },
  5: { title: "MasyaAllah, Sempurna!", text: "Semua jawabanmu benar. Kamu juara!",                     confetti: 180 }
};

const LEVELS = [
  {
    id: 1,
    topic: "Akhlak",
    difficulty: "Mudah",
    icon: "😊",
    color: "#FF6B9D",
    description: "Sikap baik sehari-hari di rumah dan sekolah.",
    questions: [
      {
        id: "1-1",
        prompt: "Ketika bertemu dengan guru atau teman di sekolah, akhlak yang baik adalah...",
        options: ["Pura-pura tidak melihat", "Tersenyum dan mengucapkan salam", "Bersembunyi karena malu", "Langsung pergi begitu saja"],
        answer: 1,
        explain: "Mengucapkan salam dan tersenyum adalah perilaku terpuji yang diajarkan Nabi Muhammad SAW untuk mempererat tali persaudaraan sesama muslim."
      },
      {
        id: "1-2",
        prompt: "Sebelum makan dan minum, kita harus membiasakan diri untuk...",
        options: ["Melihat Televisi", "Langsung menyuap makanan", "Bernyanyi bersama teman", "Berdoa dan mencuci tangan"],
        answer: 3,
        explain: "Berdoa sebelum makan adalah wujud rasa syukur kita kepada Allah SWT atas rezeki makanan yang diberikan."
      },
      {
        id: "1-3",
        prompt: "Contoh perilaku jujur di sekolah adalah...",
        options: ["Mencontek jawaban teman saat ujian", "Membeli makanan tanpa membayar", "Mengembalikan pensil teman yang tertinggal", "Menyembunyikan buku teman untuk bercanda"],
        answer: 2,
        explain: "Jujur artinya berkata dan bertindak sesuai dengan kenyataan. Mengembalikan barang yang bukan milik kita adalah salah satu bentuk kejujuran."
      },
      {
        id: "1-4",
        prompt: "Jika kita tidak sengaja merusak mainan adik, sikap akhlak yang benar adalah...",
        options: ["Meminta maaf dan mengakuinya", "Menyalahkan orang lain", "Tidak mau mengakui kesalahan", "Pura-pura tidak tahu"],
        answer: 0,
        explain: "Mengakui kesalahan dan berani meminta maaf adalah akhlak mulia yang dicintai oleh Allah SWT."
      },
      {
        id: "1-5",
        prompt: "Berkata baik atau diam merupakan ciri-ciri orang yang...",
        options: ["Penakut", "Beriman kepada Allah dan Hari Akhir", "Malas berbicara", "Sakit gigi"],
        answer: 1,
        explain: "Sesuai hadis Rasulullah SAW, orang yang beriman kepada Allah dan Hari Akhir hendaknya berkata yang baik atau memilih diam agar tidak menyakiti orang lain."
      },
      {
        id: "1-6",
        prompt: "Sikap yang benar saat orang tua sedang berbicara atau menasihati kita adalah...",
        options: ["Mendengarkan dengan sopan dan tenang", "Memotong pembicaraannya", "Menutup telinga", "Ditinggal pergi bermain"],
        answer: 0,
        explain: "Menghormati orang tua dengan mendengarkan nasihatnya termasuk dalam perilaku birrul walidain (berbakti kepada kedua orang tua)."
      },
      {
        id: "1-7",
        prompt: "Ketika melihat ada sampah plastik berserakan di halaman masjid, apa yang harus kita lakukan?",
        options: ["Mengambilnya lalu membuangnya ke tempat sampah", "Membiarkannya karena ada petugas kebersihan", "Menendang sampah tersebut", "Membuang sampah sembarangan di halaman masjid"],
        answer: 0,
        explain: "Menjaga kebersihan lingkungan, terutama tempat ibadah, adalah bagian dari iman dan bentuk akhlak terpuji kepada lingkungan."
      },
      {
        id: "1-8",
        prompt: "Perilaku mencuri dan berbohong termasuk ke dalam kelompok akhlak...",
        options: ["Amanah (dapat dipercaya)", "Mazmumah (Tercela)", "Karimah (Mulia)", "Mahmudah (Terpuji)"],
        answer: 1,
        explain: "Akhlak mazmumah adalah perilaku buruk atau tercela yang dilarang oleh agama Islam dan dapat merugikan diri sendiri serta orang lain."
      },
      {
        id: "1-9",
        prompt: "Jika ada teman yang terjatuh dari sepeda di depan rumah kita, sikap kita adalah...",
        options: ["Mentertawakannya bersama-sama", "Mengabaikannya dan masuk ke rumah", "Langsung menolong dan mengobatinya jika terluka", "Pura-pura tidak kenal"],
        answer: 2,
        explain: "Menolong orang yang sedang kesusahan atau terkena musibah adalah perbuatan yang sangat dianjurkan dalam Islam."
      },
      {
        id: "1-10",
        prompt: "Kita tidak boleh membeda-bedakan teman berdasarkan kaya atau miskin karena di hadapan Allah yang paling mulia adalah orang yang...",
        options: ["Paling banyak uangnya", "Paling ganteng", "Paling bertakwa kepada Allah SWT", "Paling bagus pakaiannya"],
        answer: 2,
        explain: "Allah SWT tidak melihat rupa atau kekayaan manusia, melainkan melihat hati dan tingkat ketakwaan serta kebaikan akhlaknya."
      }
    ]
  },
  {
    id: 2,
    topic: "Akhlak",
    difficulty: "Sulit",
    icon: "🤝",
    color: "#FF6B9D",
    description: "Cerita dan situasi akhlak yang lebih menantang.",
    questions: [
      {
        id: "2-1",
        prompt: "Nisa berteman akrab dengan Mutia. Suatu hari, Mutia bercerita tentang rahasianya kepada Nisa dan meminta Nisa untuk tidak menceritakannya kepada siapa pun. Sikap Nisa yang mencerminkan sifat Amanah adalah...",
        options: ["Menceritakannya hanya kepada satu teman dekat lainnya", "Menjaga rahasia tersebut dengan rapat dan tidak membicarakannya pada siapapun", "Menulis rahasia tersebut di media sosial tanpa menyebutkan nama Mutia", "Langsung memberitahu kepada semua orang"],
        answer: 1,
        explain: "Amanah artinya dapat dipercaya. Salah satu bentuk amanah adalah menjaga rahasia atau kepercayaan yang dititipkan orang lain kepada kita."
      },
      {
        id: "2-2",
        prompt: "Perhatikan pernyataan berikut!\n1) Merasa dirinya lebih hebat daripada teman-temannya.\n2) Meremehkan teman yang mendapat nilai lebih rendah.\n3) Tidak mau berteman dengan orang yang dianggap kurang pintar.\nPerilaku tersebut merupakan contoh sifat ...",
        options: ["Hasad (dengki)", "Riya (pamer)", "Takabur (sombong)", "Amanah (dapat dipercaya)"],
        answer: 2,
        explain: "Takabur adalah sifat sombong, yaitu merasa diri lebih hebat daripada orang lain dan meremehkan mereka. Islam mengajarkan kita untuk menghargai semua orang."
      },
      {
        id: "2-3",
        prompt: "Ahmad tidak sengaja mendengar dua temannya sedang membicarakan keburukan (aib) teman sekelas mereka yang lain. Apa yang seharusnya Ahmad lakukan sesuai ajaran islam?",
        options: ["Menasihati mereka dengan sopan agar berhenti membicarakan aib orang lain (ghibah)", "Pura-pura tidak mendengar", "Mendengarkannya sampai selesai lalu menceritakannya ke guru", "Ikut bergabung dan menambahkan cerita keburukan tersebut"],
        answer: 0,
        explain: "Membicarakan keburukan orang lain disebut ghibah dan dilarang keras dalam Islam. Sebagai muslim yang baik, kita wajib mengingatkan teman agar menjauhi perbuatan tersebut."
      },
      {
        id: "2-4",
        prompt: "Ketika hasil ujian dibagikan, ternyata nilai matematika milik Fajar sangat rendah, sedangkan nilai Rian sangat tinggi. Fajar merasa kesal dan berharap nilai Rian mendadak turun di ujian berikutnya. Sifat buruk yang ada pada diri Fajar dinamakan...",
        options: ["Hasad (Dengki)", "Kafir (Ingkar)", "Kikir (Pelit)", "Sombong"],
        answer: 0,
        explain: "Hasad adalah sifat tidak senang melihat orang lain mendapatkan nikmat dan berharap nikmat yang ada pada orang tersebut hilang atau rusak."
      },
      {
        id: "2-5",
        prompt: "Rasulullah SAW terkenal dengan gelar Al-Amin sejak usia muda. Cara terbaik bagi kita sebagai siswa untuk meneladani gelar tersebut dalam kehidupan sehari-hari adalah...",
        options: ["Menitipkan tugas sekolah kepada teman agar dikerjakan", "Mengejek teman yang tidak mandi", "Mengambil makanan di kantin melebihi jumlah yang dibayar", "Menyampaikan uang kembalian belanja dari ibu secara pas tanpa dikurangi sedikit pun"],
        answer: 3,
        explain: "Gelar Al-Amin artinya dapat dipercaya (jujur). Menyampaikan uang kembalian belanja kepada orang tua dengan jujur dan pas adalah salah satu bentuk penerapan sifat jujur dan dapat dipercaya di rumah."
      },
      {
        id: "2-6",
        prompt: "Di kelas 4 SD, terjadi perdebatan seru saat menentukan tempat tujuan kegiatan wisata sekolah. Sebagian besar anak ingin ke museum, sedangkan kelompok kecil ingin ke kebun binatang. Sikap kelompok kecil yang menunjukkan akhlak Tasamuh (toleransi/berlapang dada) adalah...",
        options: ["Marah dan mogok tidak ikut kegiatan wisata sekolah", "Menangis bersama", "Menerima keputusan mayoritas dengan ikhlas demi kebersamaan kelas", "Memaksa guru agar menuruti keinginan mereka"],
        answer: 2,
        explain: "Tasamuh atau toleransi berarti saling menghargai perbedaan pendapat dan berlapang dada menerima keputusan bersama demi kepentingan kelompok yang lebih besar."
      },
      {
        id: "2-7",
        prompt: "Allah SWT melarang umat-Nya bersikap Tabzir (pemborosan). Manakah perilaku di bawah ini yang tergolong dalam perbuatan tabzir?",
        options: ["Membeli buku tulis baru karena buku yang lama sudah penuh terisi", "Membeli makanan karena belum sarapan", "Memberikan uang saku lebih kepada anak yatim piatu", "Mengambil makanan terlalu banyak, lalu tidak habis dan dibuang"],
        answer: 3,
        explain: "Tabzir (mubazir) adalah menggunakan atau membelanjakan sesuatu secara berlebihan dan tidak membawa manfaat. Membuang-buang makanan karena nafsu mata adalah contoh nyata sifat tabzir."
      },
      {
        id: "2-8",
        prompt: "Perhatikan situasi berikut: \"Riko sedang asyik bermain game di handphone. Tiba-tiba ibunya memanggil memintanya untuk membelikan garam di warung dekat rumah.\" Sikap Riko yang paling tepat mencerminkan akhlak terpuji adalah...",
        options: ["Langsung mematikan game-nya dan segera berangkat ke warung dengan ikhlas", "Langsung pura-pura tidur agar tidak disuruh", "Mengomeli adik agar dia saja yang pergi ke warung menggantikannya", "Menjawab \"Sebentar bu!\" tetapi terus bermain game hingga berjam-jam"],
        answer: 0,
        explain: "Berbakti kepada orang tua membutuhkan pengorbanan dan kepatuhan yang segera (tidak menunda-nunda), terutama ketika mereka membutuhkan bantuan kita untuk hal-hal kebaikan."
      },
      {
        id: "2-9",
        prompt: "Jika kita bertengkar dengan teman, sikap yang sesuai dengan ajaran Islam adalah ...",
        options: ["Terus mendiamkannya dan tidak mau memaafkan", "Mengajak teman lain untuk ikut memusuhinya", "Berusaha berdamai dan saling memaafkan", "Membalas perbuatannya agar merasa jera"],
        answer: 2,
        explain: "Islam mengajarkan kita untuk menjaga hubungan baik, saling memaafkan, dan menyelesaikan perselisihan dengan cara yang baik."
      },
      {
        id: "2-10",
        prompt: "Ketika kita berbuat baik kepada orang lain, niat di dalam hati kita yang paling benar menurut ajaran Islam adalah...",
        options: ["Supaya dipuji oleh guru dan mendapatkan hadiah dari orang tua", "Agar menjadi orang yang keren", "Agar orang tersebut merasa berutang budi dan membalasnya suatu hari nanti", "Semata-mata mengharap ridha dan pahala dari Allah SWT (Ikhlas)"],
        answer: 3,
        explain: "Fondasi utama dari semua akhlak terpuji adalah keikhlasan, yaitu melakukan kebaikan hanya demi mencari ridha Allah SWT, bukan demi pujian atau keuntungan duniawi (Riya)."
      }
    ]
  },
  {
    id: 3,
    topic: "Akidah",
    difficulty: "Mudah",
    icon: "🕋",
    color: "#2BA8E0",
    description: "Mengenal Allah, malaikat, nabi, dan kitab suci.",
    questions: [
      {
        id: "3-1",
        prompt: "Siapa yang menciptakan langit, bumi, dan seluruh isi alam semesta ini?",
        options: ["Malaikat", "Manusia", "Allah SWT", "Matahari"],
        answer: 2,
        explain: "Segala sesuatu yang ada di alam semesta ini merupakan makhluk ciptaan Allah SWT, Sang Maha Pencipta (Al-Khaliq)."
      },
      {
        id: "3-2",
        prompt: "Ada berapa jumlah Rukun Iman dalam agama Islam?",
        options: ["4", "5", "6", "10"],
        answer: 2,
        explain: "Rukun Iman berjumlah 6 perkara, dimulai dari iman kepada Allah hingga iman kepada Qada dan Qadar. Jangan tertukar dengan Rukun Islam yang berjumlah 5."
      },
      {
        id: "3-3",
        prompt: "Kalimat \"Laa ilaaha illallaah\" artinya adalah...",
        options: ["Tidak ada Tuhan selain matahari", "Nabi Muhammad adalah utusan Allah", "Allah Maha Besar", "Tidak ada Tuhan selain Allah"],
        answer: 3,
        explain: "Kalimat tersebut disebut kalimat tauhid (syahadat tauhid) yang berarti pengakuan bahwa tidak ada Tuhan yang berhak disembah dengan benar kecuali Allah."
      },
      {
        id: "3-4",
        prompt: "Di mana pun kita berada, baik di kamar yang gelap atau di luar rumah, Allah SWT selalu...",
        options: ["Tidur", "Lupa", "Tidak tahu", "Melihat dan mendengar kita"],
        answer: 3,
        explain: "Allah SWT memiliki sifat Maha Melihat (Al-Bashir) dan Maha Mendengar (As-Sami'). Tidak ada satu pun hal tersembunyi yang luput dari pengawasan-Nya."
      },
      {
        id: "3-5",
        prompt: "Manakah yang termasuk contoh alam ciptaan Allah SWT?",
        options: ["Gunung dan lautan", "Sepeda roda dua", "Mobil mainan", "Meja belajar"],
        answer: 0,
        explain: "Gunung dan lautan merupakan contoh alam ciptaan Allah SWT."
      },
      {
        id: "3-6",
        prompt: "Rukun Iman yang pertama adalah percaya atau iman kepada...",
        options: ["Hari Kiamat", "Allah SWT", "Malaikat", "Kitab-kitab"],
        answer: 1,
        explain: "Dasar utama dari keimanan seorang Muslim adalah memercayai keberadaan dan keesaan Allah SWT sebagai rukun iman yang pertama."
      },
      {
        id: "3-7",
        prompt: "Malaikat adalah makhluk ciptaan Allah yang diciptakan dari...",
        options: ["Tanah", "Api", "Cahaya (Nur)", "Air"],
        answer: 2,
        explain: "Berdasarkan hadits Nabi, malaikat diciptakan dari cahaya (nur), jin diciptakan dari api (nar), dan manusia pertama (Nabi Adam) diciptakan dari tanah."
      },
      {
        id: "3-8",
        prompt: "Siapakah nabi dan rasul terakhir penutup para nabi?",
        options: ["Nabi Adam AS", "Nabi Ibrahim AS", "Nabi Isa AS", "Nabi Muhammad SAW"],
        answer: 3,
        explain: "Nabi Muhammad SAW memiliki gelar Khatamul Anbiya' yang artinya penutup atau pamungkas para nabi dan rasul. Tidak ada nabi lagi setelah beliau."
      },
      {
        id: "3-9",
        prompt: "Kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW adalah...",
        options: ["Al-Qur'an", "Injil", "Taurat", "Zabur"],
        answer: 0,
        explain: "Al-Qur'an adalah kitab suci terakhir yang diwahyukan kepada Nabi Muhammad SAW sebagai pedoman hidup seluruh umat Islam."
      },
      {
        id: "3-10",
        prompt: "Bunyi syahadat kedua (syahadat rasul) adalah \"Wa asyhadu anna...\"",
        options: ["Adaman Rasulullah", "Muhammadan Rasulullah", "Ibrahima Khalilullah", "Isa ruhullah"],
        answer: 1,
        explain: "Bunyi lengkap syahadat rasul adalah \"Wa asyhadu anna Muhammadar Rasulullah\", yang artinya: \"Dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah.\""
      }
    ]
  },
  {
    id: 4,
    topic: "Akidah",
    difficulty: "Sulit",
    icon: "🌟",
    color: "#2BA8E0",
    description: "Asmaul Husna, rukun iman, dan para malaikat.",
    questions: [
      {
        id: "4-1",
        prompt: "Asmaul Husna \"Al-Bashir\" artinya Allah Maha...",
        options: ["Mendengar", "Mengetahui", "Melihat", "pengasih"],
        answer: 2,
        explain: "Al-Bashir artinya Allah Maha Melihat. Allah melihat segala sesuatu, baik yang terlihat maupun yang tersembunyi."
      },
      {
        id: "4-2",
        prompt: "Asmaul Husna \"Ar-Rahman\" artinya Allah maha...",
        options: ["Mendengar", "Maha Kuat", "Mengetahui", "Pengasih"],
        answer: 3,
        explain: "Ar-Rahman artinya Allah Maha Pengasih kepada seluruh makhluk-Nya."
      },
      {
        id: "4-3",
        prompt: "Manakah contoh perilaku yang menunjukkan rasa syukur kepada Allah SWT?",
        options: ["Menggunakan nikmat untuk berbuat baik", "Merusak barang yang dimiliki", "Membanggakan diri di hadapan teman", "Mengeluh ketika mendapat nikmat"],
        answer: 0,
        explain: "Bersyukur berarti berterima kasih kepada Allah atas nikmat yang diberikan dan menggunakannya untuk hal-hal yang baik."
      },
      {
        id: "4-4",
        prompt: "Malaikat yang bertugas meniup sangkakala pada hari kiamat adalah...",
        options: ["Malaikat Jibril", "Malaikat Israfil", "Malaikat Mikail", "Malaikat Izrail"],
        answer: 1,
        explain: "Malaikat Israfil ditugaskan oleh Allah SWT untuk meniup terompet sangkakala sebanyak dua kali: tiupan pertama pemusnah alam semesta dan tiupan kedua hari kebangkitan."
      },
      {
        id: "4-5",
        prompt: "Malaikat yang bertugas menjaga pintu neraka bernama...",
        options: ["Malaikat Munkar", "Malaikat Ridwan", "Malaikat Malik", "Malaikat Nakir"],
        answer: 2,
        explain: "Penjaga pintu neraka dipimpin oleh Malaikat Malik (yang bersifat tegas dan kasar terhadap ahli neraka), sedangkan penjaga surga adalah Malaikat Ridwan."
      },
      {
        id: "4-6",
        prompt: "Kitab Zabur adalah kitab suci yang diturunkan oleh Allah SWT kepada Nabi...",
        options: ["Nabi Musa AS", "Nabi Isa AS", "Nabi Ibrahim AS", "Nabi Daud AS"],
        answer: 3,
        explain: "Allah menurunkan empat kitab suci utama: Taurat kepada Nabi Musa, Zabur kepada Nabi Daud, Injil kepada Nabi Isa, dan Al-Qur'an kepada Nabi Muhammad SAW."
      },
      {
        id: "4-7",
        prompt: "Siapakah nabi pertama yang diciptakan dan diutus oleh Allah SWT?",
        options: ["Nabi Adam AS", "Nabi Musa AS", "Nabi Daud AS", "Nabi Muhammad SAW"],
        answer: 0,
        explain: "Nabi Adam AS adalah manusia pertama sekaligus nabi pertama yang diciptakan Allah SWT dari tanah."
      },
      {
        id: "4-8",
        prompt: "Sifat \"Amanah\" yang dimiliki para rasul berarti...",
        options: ["Suka bercanda", "Dapat dipercaya", "Selalu ingin dipuji", "Mudah menyerah"],
        answer: 1,
        explain: "Amanah berarti dapat dipercaya dan menjaga kepercayaan yang diberikan."
      },
      {
        id: "4-9",
        prompt: "Beriman kepada Hari Kiamat merupakan rukun iman yang ke...",
        options: ["3", "4", "5", "6"],
        answer: 2,
        explain: "Urutan Rukun Iman: 1. Iman kepada Allah, 2. Malaikat, 3. Kitab, 4. Rasul, 5. Hari Kiamat, 6. Qada dan Qadar. Jadi, Hari Kiamat berada di urutan kelima."
      },
      {
        id: "4-10",
        prompt: "Percaya bahwa Allah telah menetapkan segala sesuatu disebut iman kepada…",
        options: ["Mukjizat", "Karamah", "Syariat", "Qada dan Qadar (Takdir)"],
        answer: 3,
        explain: "Qada adalah ketetapan Allah sejak zaman azali (sebelum alam semesta ada), sedangkan Qadar adalah perwujudan dari ketetapan tersebut yang terjadi pada makhluk-Nya. Keduanya biasa disebut takdir."
      }
    ]
  },
  {
    id: 5,
    topic: "Sejarah Nabi",
    difficulty: "Mudah",
    icon: "📖",
    color: "#2EC27E",
    description: "Kisah Nabi Muhammad SAW dan para nabi.",
    questions: [
      {
        id: "5-1",
        prompt: "Peristiwa penting apakah yang dialami Nabi Muhammad SAW di mana beliau menerima perintah salat lima waktu?",
        options: ["Peristiwa perang badar", "Peristiwa Isra Mikraj", "Peristiwa perang uhud", "Peristiwa tahun gajah"],
        answer: 1,
        explain: "Peristiwa Isra Mikraj merupakan perjalanan Nabi Muhammad SAW yang menjadi salah satu peristiwa penting dalam Islam. Pada peristiwa ini, umat Islam menerima perintah salat lima waktu."
      },
      {
        id: "5-2",
        prompt: "Di kota manakah Nabi Muhammad SAW dilahirkan?",
        options: ["Madinah", "Jerusalem", "Makkah", "Thaif"],
        answer: 2,
        explain: "Nabi Muhammad SAW dilahirkan di kota Makkah pada Tahun Gajah di rumah ibundanya, Siti Aminah."
      },
      {
        id: "5-3",
        prompt: "Siapakah Nabi yang membuat kapal yang sangat besar untuk menyelamatkan orang beriman dari banjir besar?",
        options: ["Nabi Nuh AS", "Nabi Yunus AS", "Nabi Isa AS", "Nabi Ibrahim AS"],
        answer: 0,
        explain: "Nabi Nuh AS membuat kapal besar atas perintah Allah untuk menyelamatkan pengikutnya yang beriman serta berbagai jenis hewan dari banjir bandang."
      },
      {
        id: "5-4",
        prompt: "Nabi siapakah yang tidak terbakar ketika dilemparkan ke dalam kobaran api yang besar oleh Raja Namrud?",
        options: ["Nabi Musa AS", "Nabi Yusuf AS", "Nabi Idris AS", "Nabi Ibrahim AS"],
        answer: 3,
        explain: "Allah SWT menyelamatkan Nabi Ibrahim AS dengan memerintahkan api agar menjadi dingin dan membawa keselamatan bagi beliau."
      },
      {
        id: "5-5",
        prompt: "Nabi siapakah yang pernah ditelan oleh ikan besar di dalam lautan?",
        options: ["Nabi Nuh AS", "Nabi Yunus AS", "Nabi Sulaiman AS", "Nabi Ayyub AS"],
        answer: 1,
        explain: "Nabi Yunus AS ditelan ikan besar setelah meninggalkan kaumnya. Di dalam perut ikan, beliau terus bertaubat dan memohon ampun kepada Allah."
      },
      {
        id: "5-6",
        prompt: "Siapakah nabi yang mendapat mukjizat berupa tongkat yang dapat berubah menjadi ular atas izin Allah SWT?",
        options: ["Nabi Musa AS", "Nabi Yusuf AS", "Nabi Nuh AS", "Nabi Sulaiman AS"],
        answer: 0,
        explain: "Allah SWT memberikan mukjizat kepada Nabi Musa AS, salah satunya tongkat yang dapat berubah menjadi ular. Mukjizat tersebut menjadi bukti kekuasaan Allah SWT."
      },
      {
        id: "5-7",
        prompt: "Siapakah nama ayah kandung dari Nabi Muhammad SAW?",
        options: ["Abu Lahab", "Abu Thalib", "Abdullah", "Abdul Muthalib"],
        answer: 2,
        explain: "Ayah Nabi Muhammad SAW bernama Abdullah bin Abdul Muthalib, yang wafat saat Nabi masih berada di dalam kandungan."
      },
      {
        id: "5-8",
        prompt: "Siapakah nama ibu kandung dari Nabi Muhammad SAW?",
        options: ["Aminah", "Halimah As-Sa'diyah", "Khadijah", "Fatimah"],
        answer: 0,
        explain: "Ibu kandung Nabi bernama Siti Aminah binti Wahab. Beliau wafat di daerah Abwa ketika Nabi berusia 6 tahun."
      },
      {
        id: "5-9",
        prompt: "Tempat Nabi Muhammad SAW menerima wahyu yang pertama (Surat Al-Alaq ayat 1-5) adalah…",
        options: ["Gua Hira", "Gua Tsur", "Masjid Nabawi", "Jabal Uhud"],
        answer: 0,
        explain: "Wahyu pertama yang diterima Nabi Muhammad SAW adalah Surah Al-Alaq ayat 1–5 ketika beliau berada di Gua Hira."
      }
    ]
  },
  {
    id: 6,
    topic: "Sejarah Nabi",
    difficulty: "Sulit",
    icon: "🌙",
    color: "#2EC27E",
    description: "Mukjizat dan kisah para nabi yang lebih sulit.",
    questions: [
      {
        id: "6-1",
        prompt: "Dalam mimpi Nabi Yusuf AS waktu kecil, berapa jumlah bintang yang bersujud kepadanya bersama matahari dan bulan?",
        options: ["7 bintang", "11 bintang", "12 bintang", "10 bintang"],
        answer: 1,
        explain: "Nabi Yusuf bermimpi melihat 11 bintang, matahari, dan bulan bersujud kepadanya. Ini melambangkan 11 saudaranya serta kedua orang tuanya yang kelak akan menghormatinya."
      },
      {
        id: "6-2",
        prompt: "Nabi Ayyub AS mendapat ujian yang berat dalam hidupnya. Sikap apakah yang dapat kita teladani dari beliau?",
        options: ["Marah ketika mendapat kesulitan", "Tetap sabar dan berdoa kepada Allah SWT", "Menyerah dan berhenti berusaha", "Menyalahkan orang lain atas kesulitannya"],
        answer: 1,
        explain: "Nabi Ayyub AS tetap sabar ketika mendapat ujian dan berdoa kepada Allah SWT memohon pertolongan. Kita dapat meneladani kesabaran dan keteguhan iman beliau."
      },
      {
        id: "6-3",
        prompt: "Burung apakah yang membawa kabar tentang Negeri saba kepada Nabi Sulaiman AS?",
        options: ["Burung Merpati", "Burung Hud-hud", "Burung Gagak", "Burung Elang"],
        answer: 1,
        explain: "Burung Hud-hud membawa kabar kepada Nabi Sulaiman AS tentang negeri Saba dan Ratu Balqis."
      },
      {
        id: "6-4",
        prompt: "Siti Hajar berlari-lari kecil mencari air antara dua bukit, yaitu bukit…",
        options: ["Safa dan Marwah", "Uhud dan Hira", "Tursina dan Nur", "Quban dan Arafah"],
        answer: 0,
        explain: "Siti Hajar berlari kecil dari Bukit Safa ke Bukit Marwah untuk mencari sumber air bagi putranya, Nabi Ismail AS, yang menangis kehausan di padang pasir yang tandus."
      },
      {
        id: "6-5",
        prompt: "Mukjizat apakah yang Allah berikan kepada Nabi Musa AS ketika terpojok di tepi Laut Merah saat dikejar oleh bala tentara Firaun?",
        options: ["Memanggil pasukan burung dari langit", "Menghilang dari pandangan musuh", "Membuat air bah menenggelamkan musuh seketika", "Memukulkan tongkat ke laut hingga airnya terbelah"],
        answer: 3,
        explain: "Atas perintah Allah, Nabi Musa memukulkan tongkatnya ke Laut Merah, lalu laut tersebut terbelah menjadi jalan kering sehingga kaum Bani Israil bisa menyeberang dengan selamat."
      },
      {
        id: "6-6",
        prompt: "Mukjizat luar biasa apa yang dianugerahkan Allah kepada Nabi Isa AS saat beliau masih bayi di dalam gendongan untuk membela kehormatan ibunya (Siti Maryam)?",
        options: ["Dapat berbicara menjelaskan kebenaran", "Mengeluarkan cahaya terang dari tubuhnya", "Membuat makanan turun dari udara", "Menghidupkan mainan dari tanah liat"],
        answer: 0,
        explain: "Allah mengizinkan Nabi Isa AS berbicara ketika masih bayi untuk membela ibunya, Maryam."
      },
      {
        id: "6-7",
        prompt: "Nabi Muhammad SAW meninggal dunia pada usia…",
        options: ["60 tahun", "63 tahun", "62 tahun", "70 tahun"],
        answer: 1,
        explain: "Nabi Muhammad SAW meninggal dunia pada usia 63 tahun di Madinah."
      },
      {
        id: "6-8",
        prompt: "Paman Nabi Muhammad SAW yang selalu membela dan melindungi dakwah beliau di Makkah dari gangguan kaum kafir Quraisy, meskipun ia tidak sempat memeluk Islam hingga akhir hayatnya, adalah...",
        options: ["Abu Lahab", "Hamzah bin Abdul Muthalib", "Abu Thalib", "Abbas bin Abdul Muthalib"],
        answer: 2,
        explain: "Abu Thalib adalah paman kandung yang sangat berjasa melindungi dan membentengi Nabi dari ancaman fisik kaum Quraisy demi kelancaran dakwah Islam."
      },
      {
        id: "6-9",
        prompt: "Kalimat tasbih dan pengakuan dosa yang dibaca Nabi Yunus AS ketika berada di dalam kegelapan perut ikan paus adalah...",
        options: ["Alhamdulillah robbil 'alamin", "Hasbunallah wa ni'mal wakil", "La ilaha illa anta subhanaka inni kuntu minaz-zalimin", "La hawla wala quwwata illa billah"],
        answer: 2,
        explain: "Kalimat ini adalah doa pengakuan dosa dan penyerahan diri Nabi Yunus AS, yang artinya: \"Tidak ada tuhan selain Engkau, Maha Suci Engkau, sungguh aku termasuk orang-orang yang zalim.\""
      },
      {
        id: "6-10",
        prompt: "Nabi siapakah yang dikenal memiliki kemampuan istimewa dapat melunakkan besi dengan tangan kosong, membuat baju perang, serta memiliki suara yang luar biasa merdu saat bertasbih?",
        options: ["Nabi Sulaiman AS", "Nabi Daud AS", "Nabi Ilyas AS", "Nabi Zulkifli AS"],
        answer: 1,
        explain: "Allah melunakkan besi bagi Nabi Daud AS agar beliau bisa membuat baju zirah untuk perlindungan perang dengan mudah, dan beliau dianugerahi suara merdu yang membuat gunung serta burung ikut bertasbih bersamanya."
      }
    ]
  }
];
