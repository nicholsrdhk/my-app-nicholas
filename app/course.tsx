// app/course.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CourseTopic from '../components/modules/course/Topic';
import CourseQuiz from '../components/modules/course/Quiz';
import { useState } from 'react';
import { Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { markMaterialRead, markQuizAnswered } from '@/store/reducer/progressSlice';

const courseData={
  content:[
    { 
      type:'materi',
      ilustration: 'https://reactjs.org/logo-og.png',
      value:[
        { id: 0, description: 'Bab I - Apa itu React.lazy?' },
        { id: 1, description: 'React.lazy adalah fitur dari React yang memungkinkan pemuatan komponen dilakukan secara malas atau tertunda. Ini berarti sebuah komponen tidak akan dimuat sampai saat benar-benar diperlukan. Strategi ini dikenal dengan nama lazy loading, dan sangat efektif dalam mengurangi beban awal saat aplikasi pertama kali dibuka.' },
        { id: 2, description: 'Dalam proyek skala besar, sering kali ada banyak komponen yang tidak semuanya ditampilkan sekaligus. Tanpa lazy loading, semua komponen akan dimuat bersama di awal, yang bisa menyebabkan waktu loading awal yang lama. React.lazy membantu mencegah hal ini dengan memecah kode menjadi bagian-bagian kecil yang dimuat sesuai kebutuhan.' },
        { id: 3, description: 'React.lazy dirancang untuk bekerja dengan fitur Suspense dari React. Ini membuat integrasinya terasa alami dalam proses rendering. Dengan menggunakan React.lazy, kita bisa menjaga agar ukuran bundel aplikasi tetap kecil dan efisien.' },
        { id: 4, description: 'Penting untuk dicatat bahwa React.lazy hanya bekerja untuk komponen yang diekspor secara default. Ini merupakan batasan teknis yang perlu diperhatikan saat mengatur struktur modul atau file pada proyek.' },
        { id: 5, description: 'Secara keseluruhan, React.lazy memberikan kontrol lebih baik dalam hal performa dan struktur modularisasi aplikasi. Ini sangat berguna untuk meningkatkan pengalaman pengguna dengan memuat hanya komponen yang sedang dilihat.' },
      ]
    },
    { 
      type:'materi',
      ilustration: 'https://reactjs.org/logo-og.png',
      value:[
        { id: 0, description: 'Bab II - Cara Menggunakan React.lazy' },
        { id: 1, description: 'Untuk menggunakan React.lazy, kita cukup menentukan komponen mana yang ingin dimuat secara malas. Pendekatan ini membantu pengembang menyusun struktur aplikasi yang lebih efisien. Tidak semua komponen harus dimuat sekaligus, hanya yang benar-benar sedang dibutuhkan oleh pengguna.' },
        { id: 2, description: 'React.lazy membuat React bekerja seperti sistem modular yang dinamis. Setiap bagian dari aplikasi dapat dipecah dan diatur agar hanya muncul ketika dibutuhkan. Ini memudahkan pengelolaan proyek besar yang memiliki banyak bagian terpisah atau halaman berbeda.' },
        { id: 3, description: 'Dengan pendekatan ini, kita tidak hanya meningkatkan kecepatan awal aplikasi, tapi juga mengurangi konsumsi memori pada perangkat pengguna. Ini sangat terasa ketika aplikasi dijalankan di perangkat dengan spesifikasi rendah atau koneksi internet yang lambat.' },
        { id: 4, description: 'Penerapan React.lazy biasanya dikombinasikan dengan sistem routing atau navigasi. Komponen halaman atau fitur berat sering kali menjadi kandidat utama untuk dimuat secara malas agar tidak membebani waktu loading awal.' },
        { id: 5, description: 'Meski React.lazy cukup mudah digunakan, pengembang tetap harus merencanakan pemecahan modul dengan baik. Ini penting agar tidak menimbulkan kesalahan saat komponen dipanggil, terutama saat komponen belum sempat dimuat sepenuhnya.' },
      ]
    },
    { 
      type:'materi',
      ilustration: 'https://reactjs.org/logo-og.png',
      value:[
        { id: 0, description: 'Bab III - Suspense sebagai Pembungkus Lazy Component' },
        { id: 1, description: 'Suspense adalah komponen bawaan dari React yang digunakan untuk membungkus komponen yang dimuat secara malas. Suspense memungkinkan pengembang menampilkan konten sementara (seperti loading screen) saat komponen utama masih dalam proses pemuatan.' },
        { id: 2, description: 'Dengan Suspense, pengguna tidak akan melihat layar kosong saat komponen sedang dimuat. Sebaliknya, mereka akan melihat indikator visual yang menandakan bahwa aplikasi sedang bekerja. Ini sangat penting untuk menjaga pengalaman pengguna tetap baik.' },
        { id: 3, description: 'Suspense membantu mengatur alur render ketika menggunakan React.lazy. Tanpa Suspense, React tidak akan tahu bagaimana menangani komponen yang belum siap. Karena itu, Suspense dan lazy biasanya selalu digunakan bersamaan.' },
        { id: 4, description: 'React memberikan fleksibilitas dalam menentukan tampilan sementara yang digunakan Suspense. Tampilan ini bisa sesederhana teks "Loading..." atau animasi loading yang lebih kompleks sesuai kebutuhan desain aplikasi.' },
        { id: 5, description: 'Penting untuk diingat bahwa Suspense bekerja secara sinkron terhadap komponen lazy. Artinya, ia hanya mengatur waktu tampilan komponen, bukan mengambil data atau menjalankan logika async lain. Untuk itu, perlu pendekatan tambahan jika ingin memuat data dari server secara bersamaan.' },
      ]
    },
    { 
      type:'materi',
      ilustration: 'https://reactjs.org/logo-og.png',
      value:[
        { id: 0, description: 'Bab IV - Manfaat Lazy Loading' },
        { id: 1, description: 'Lazy loading memberikan dampak besar terhadap performa aplikasi, terutama dari sisi waktu muat awal. Dengan hanya memuat komponen yang benar-benar digunakan saat itu, waktu loading awal aplikasi bisa jauh lebih singkat.' },
        { id: 2, description: 'Hal ini sangat bermanfaat untuk aplikasi dengan fitur-fitur besar yang tidak selalu digunakan secara bersamaan. Misalnya, halaman profil pengguna, dashboard admin, atau fitur statistik bisa ditunda pemuatannya sampai pengguna membukanya.' },
        { id: 3, description: 'Selain waktu loading, lazy loading juga membantu mengurangi konsumsi bandwidth dan memori. Ini membuat aplikasi lebih ramah untuk dijalankan di jaringan lambat atau perangkat dengan keterbatasan sumber daya.' },
        { id: 4, description: 'Dari sisi pengembangan, lazy loading juga mendukung pengelolaan proyek yang lebih modular. Komponen dapat dikembangkan dan diatur terpisah, memudahkan debugging dan pengujian secara parsial.' },
        { id: 5, description: 'Secara keseluruhan, lazy loading adalah strategi penting dalam mengembangkan aplikasi web modern, terutama yang dibangun menggunakan React. Penggunaan React.lazy dan Suspense adalah alat utama untuk menerapkan strategi ini.' },
      ]
    },
    { 
      type:'materi',
      ilustration: 'https://reactjs.org/logo-og.png',
      value:[
        { id: 0, description: 'Bab V - Batasan React.lazy dan' },
        { id: 1, description: 'Walaupun React.lazy dan Suspense sangat bermanfaat, keduanya memiliki beberapa keterbatasan yang perlu diperhatikan. Salah satu batas utama adalah bahwa React.lazy hanya bisa digunakan untuk impor default. Jika komponen diekspor secara named, maka tidak bisa dimuat dengan React.lazy secara langsung.' },
        { id: 2, description: 'Suspense juga hanya mendukung pemuatan komponen, bukan pemanggilan data async seperti API. Jadi, untuk loading data dari server, React belum menyediakan Suspense yang sepenuhnya mendukung fitur itu secara native. Untuk kasus seperti ini, biasanya digunakan library pihak ketiga seperti React Query atau Relay.' },
        { id: 3, description: 'Selain itu, jika terjadi kegagalan dalam pemuatan komponen (misalnya file tidak tersedia atau error jaringan), React tidak langsung menanganinya. Pengembang harus menambahkan Error Boundaries untuk menghindari crash dan memberikan umpan balik ke pengguna.' },
        { id: 4, description: 'Suspense saat ini juga belum mendukung fallback bersyarat yang kompleks, misalnya berdasarkan jenis error atau status loading tertentu. Ini membuat kontrol terhadap perilaku loading agak terbatas di luar kasus penggunaan sederhana.' },
        { id: 5, description: 'Meskipun begitu, React.lazy dan Suspense tetap sangat berguna untuk struktur dasar aplikasi yang membutuhkan pemuatan komponen secara efisien. Dengan pemahaman terhadap batasan ini, pengembang bisa menggunakan fitur ini dengan lebih bijak.' },
      ]
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Apa tujuan utama penggunaan React.lazy dalam aplikasi React?',
        options: [
          { value: 1, label: 'Mengganti semua komponen menjadi class-based' },
          { value: 2, label: 'Memuat komponen secara dinamis hanya saat dibutuhkan' },
          { value: 3, label: 'Menghapus komponen yang tidak aktif dari memori' },
          { value: 4, label: 'Menyimpan komponen ke dalam local storage' }
        ],
        answer: 2
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Apa yang dilakukan Suspense saat digunakan dalam aplikasi React?',
        options: [
          { value: 1, label: 'Memvalidasi props yang diterima komponen' },
          { value: 2, label: 'Menampilkan error secara otomatis saat ada crash' },
          { value: 3, label: 'Menghapus komponen setelah tidak digunakan' },
          { value: 4, label: 'Menampilkan fallback saat komponen masih dimuat' }
        ],
        answer: 4
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Salah satu keuntungan utama dari lazy loading adalah...',
        options: [
          { value: 1, label: 'Mengurangi waktu muat awal aplikasi' },
          { value: 2, label: 'Mempercepat waktu rendering server-side' },
          { value: 3, label: 'Menghindari penggunaan useEffect' },
          { value: 4, label: 'Menyimpan data di dalam komponen' }
        ],
        answer: 1
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Apa batasan dari React.lazy yang perlu diperhatikan?',
        options: [
          { value: 1, label: 'Hanya bisa digunakan untuk function component' },
          { value: 2, label: 'Tidak mendukung komponen bersarang' },
          { value: 3, label: 'Hanya bisa digunakan untuk default export' },
          { value: 4, label: 'Tidak dapat bekerja tanpa Redux' }
        ],
        answer: 3
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Apa yang harus dilakukan jika terjadi kesalahan saat memuat komponen lazy?',
        options: [
          { value: 1, label: 'Gunakan state global' },
          { value: 2, label: 'Gunakan Error Boundaries' },
          { value: 3, label: 'Gunakan React Context' },
          { value: 4, label: 'Gunakan useReducer' }
        ],
        answer: 2
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Apa yang terjadi jika React.lazy digunakan tanpa Suspense?',
        options: [
          { value: 1, label: 'Akan terjadi error saat render komponen' },
          { value: 2, label: 'React akan menampilkan fallback default' },
          { value: 3, label: 'React akan otomatis menggunakan loading spinner' },
          { value: 4, label: 'Komponen tetap dimuat dengan benar' }
        ],
        answer: 1
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Komponen apa yang digunakan untuk menampilkan loading sementara?',
        options: [
          { value: 1, label: 'Fragment' },
          { value: 2, label: 'Provider' },
          { value: 3, label: 'Suspense' },
          { value: 4, label: 'Portal' }
        ],
        answer: 3
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Mengapa lazy loading cocok untuk aplikasi besar?',
        options: [
          { value: 1, label: 'Karena semua komponen bisa digabung jadi satu file' },
          { value: 2, label: 'Karena hanya komponen ringan yang bisa digunakan' },
          { value: 3, label: 'Karena hanya halaman yang digunakan yang akan dimuat' },
          { value: 4, label: 'Karena React memuat semua komponen sekaligus' }
        ],
        answer: 3
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Apa keuntungan utama menggunakan Suspense dalam UX (User Experience)?',
        options: [
          { value: 1, label: 'Menyediakan tampilan sementara saat loading' },
          { value: 2, label: 'Mengurangi ukuran file CSS' },
          { value: 3, label: 'Menyembunyikan error aplikasi' },
          { value: 4, label: 'Menghindari penggunaan JavaScript' }
        ],
        answer: 1
      }
    },
    { 
      type:'quiz',
      ilustration: null,
      value:{
        question: 'Suspense di React saat ini tidak bisa digunakan langsung untuk...',
        options: [
          { value: 1, label: 'Mengatur fallback visual' },
          { value: 2, label: 'Melakukan lazy loading' },
          { value: 3, label: 'Membungkus komponen fungsional' },
          { value: 4, label: 'Mengelola data async dari API' }
        ],
        answer: 4
      }
    }
  ]
}

export default function CourseScreen() {
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.progress);
  const params = useLocalSearchParams();

  // Tentukan starting index berdasarkan progress atau override
  const getInitialIndex = () => {
    if (params?.startFrom !== undefined) {
      return Number(params.startFrom); // dari tombol reset
    }

    const totalMaterialsRead = progress.readMaterials.length;
    const totalQuizzesAnswered = progress.answeredQuiz.length;

    // Resume ke konten terakhir yang sudah dicapai
    return Math.max(totalMaterialsRead, totalQuizzesAnswered);
  };

  const [activeContent, setActiveContent] = useState(getInitialIndex());

  const onNextContent = () => {
    const currentContent = courseData.content[activeContent];

    if (currentContent.type === 'materi') {
      dispatch(markMaterialRead(activeContent + 1));
    }

    if (currentContent.type === 'quiz') {
      const quizContents = courseData.content.filter(c => c.type === 'quiz');
      const quizIndex = quizContents.findIndex(q => q === currentContent);
      dispatch(markQuizAnswered(quizIndex));
    }

    if (activeContent < courseData.content.length - 1) {
      setActiveContent(activeContent + 1);
    } else {
      Alert.alert('Selamat!', 'Kamu sudah menyelesaikan semua materi dan kuis.', [
        { text: 'OK', onPress: () => router.replace('./(tabs)/progres') },
      ]);
    }
  };

  const CourseController = () => {
    const current = courseData.content[activeContent];
    const quizContents = courseData.content.filter(c => c.type === 'quiz');
    const quizIndex = quizContents.findIndex(q => q === current);

    if (current.type === 'materi') {
      return <CourseTopic onNextContent={onNextContent} topic={current.value} />;
    }

    if (current.type === 'quiz') {
      return <CourseQuiz onNextContent={onNextContent} content={current.value} quizIndex={quizIndex} />;
    }

    return null;
  }; 

  return (
    <SafeAreaProvider>
      <CourseController />
    </SafeAreaProvider>
  );
}
