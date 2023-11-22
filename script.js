const letterContainer = document.getElementById('letter-container');
const optionsContainer = document.getElementById('options-container');
const userInputSection = document.getElementById('user-input-section');
const newGameContainer = document.getElementById('new-game-container');
const newGameButton = document.getElementById('new-game-button');
const canvas = document.getElementById('canvas');
const resultText = document.getElementById('result-text');

// Untuk kategori game dan kata-katanya
let options = {
  Buah: ['Apel', 'Anggur', 'Semangka', 'Nanas', 'Jeruk', 'Jambu'],
  Hewan: ['Semut', 'Gajah', 'Jerapah', 'Harimau', 'Singa', 'Zebra'],
  Negara: ['Indonesia', 'Korea', 'Thailand', 'Malaysia', 'Spanyol', 'Arab'],
};

//hitung
let winCount = 0;
let count = 0;

let chosenWord = '';

//Menampilkan button ketagori
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Pilih Salah Satu</h3>`;
  let buttonCon = document.createElement('div');
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//blokir button
const blocker = () => {
  // Memilih semua elemen dengan kelas 'options' dan 'letters' dari dokumen
  let optionsButtons = document.querySelectorAll('.options');
  let letterButtons = document.querySelectorAll('.letters');

  // Menonaktifkan semua tombol dengan kelas 'options'
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Menonaktifkan semua tombol dengan kelas 'letters'
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  // Menghapus kelas 'hide' dari elemen dengan ID 'newGameContainer'
  newGameContainer.classList.remove('hide');
};

///Pembangkit Kata
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll('.options');
  //Jika nilai optionValue sama dengan innerText dari tombol, maka tombol tersebut akan di-highlight
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add('active');
    }
    button.disabled = true;
  });

  //awalnya sembunyikan huruf, hapus kata sebelumnya
  letterContainer.classList.remove('hide');
  userInputSection.innerText = '';

  let optionArray = options[optionValue];
  //pilih kata secara acak
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //gantikan setiap huruf dengan span berisi garis bawah
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Tampilkan setiap elemen sebagai span
  userInputSection.innerHTML = displayItem;
};


// Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  // Inisialisasi variabel winCount dan count dengan nilai 0
  winCount = 0;
  count = 0;

  // Hapus semua konten di dalam elemen dengan id 'userInputSection'
  // dan elemen dengan id 'optionsContainer'
  userInputSection.innerHTML = '';
  optionsContainer.innerHTML = '';

  // Sembunyikan elemen dengan class 'hide' pada elemen dengan id 'letterContainer'
  // dan elemen dengan id 'newGameContainer'
  letterContainer.classList.add('hide');
  newGameContainer.classList.add('hide');

  // Hapus semua konten di dalam elemen dengan id 'letterContainer'
  letterContainer.innerHTML = '';



  // Untuk membuat tombol huruf
  for (let i = 65; i < 91; i++) {
    let button = document.createElement('button');
    button.classList.add('letters');
    // Mengonversi angka ke karakter ASCII [A-Z]
    button.innerText = String.fromCharCode(i);
    // Menambahkan event listener saat tombol huruf diklik
    button.addEventListener('click', () => {
      let charArray = chosenWord.split('');
      let dashes = document.getElementsByClassName('dashes');
      // Jika array berisi nilai yang sama dengan huruf yang diklik, ganti dash yang cocok dengan huruf tersebut
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //Jika karakter dalam array sama dengan tombol yang diklik
          if (char === button.innerText) {
            // Ganti dash dengan huruf
            dashes[index].innerText = char;
            // Increment counter untuk menang
            winCount += 1;
            // Jika winCount sama dengan panjang kata
            if (winCount == charArray.length) {
              // Tampilkan pesan menang
              resultText.innerHTML = `<h2 class='win-msg'>Kamu Menang :)</h2><p>Katanya adalah <span>${chosenWord}</span></p>`;
              // Blokir semua tombol
              blocker();
            }
          }
        });
      } else {
        // Jika huruf tidak ada dalam kata, tambahkan ke counter kalah
        count += 1;
        // Gambar manusia stik
        drawMan(count);
        // Jika count sama dengan 6 karena kepala, badan, lengan kiri, lengan kanan, kaki kiri, dan kaki kanan
        if (count == 6) {
          // Tampilkan pesan kalah
          resultText.innerHTML = `<h2 class='lose-msg'>Kamu Kalah :(</h2><p>Katanya adalah<span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      // Menonaktifkan tombol yang diklik
    button.disabled = true;
      button.disabled = true;
    });
    letterContainer.append(button);
  }

    // Memanggil fungsi displayOptions() untuk menampilkan opsi atau elemen-elemen tertentu pada permainan
  displayOptions();
  // Memanggil fungsi canvasCreator() dan menyimpan hasil objek yang dikembalikan dalam variabel
  let { initialDrawing } = canvasCreator();
  // Menggunakan fungsi initialDrawing untuk menggambar frame atau elemen dasar awal pada canvas
  initialDrawing();

};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext('2d');
  context.beginPath();
  context.strokeStyle = '#FBA1B7';
  context.lineWidth = 2;

  // Untuk menggambar garis
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  // Menggambar kepala
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  // Menggambar badan
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  // Menggambar tangan kiri
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  // Menggambar tangan kanan
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  // Menggambar kaki kiri
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  // Menggambar kaki kanan
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  // Frame awal
  const initialDrawing = () => {
    // Menghapus isi canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // Garis bawah
    drawLine(10, 130, 130, 130);
    // Garis kiri
    drawLine(10, 10, 10, 131);
    // Garis atas
    drawLine(10, 10, 70, 10);
    // Garis atas kecil
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Gambar stickman
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

// Game baru
newGameButton.addEventListener('click', initializer);
window.onload = initializer;
