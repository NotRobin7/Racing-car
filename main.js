const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const carImage = new Image();
carImage.src = 'car.png';
const enemy = new Image();
enemy.src = 'carBiru.png'
const enemy2 = new Image();
enemy2.src = 'carHitam.png'
const mixCar = enemy + enemy2;
const backgroundImage = new Image();
backgroundImage.src = 'latar3.jpg';

// Car object
const car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 120,
    height: 50,
    speed: 3
    
   
   
  
};
// Draw car
function drawCar() {
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}

// Draw background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update game state
function update() {
    clearCanvas();
    drawBackground();
    drawCar();
    drawOtherCars();
    updateOtherCars();
    detectCollision();
    drawScore();
    increaseScore();
    suara.play();
    
    
   
    // Perbarui posisi latar belakang
    backgroundY += car.speed; // Menggerakkan latar belakang ke bawah
    if (backgroundY >= canvas.height) {
        backgroundY = 0; // Mengatur ulang posisi latar belakang jika sudah mencapai batas bawah canvas
    }
}





let sound = new Audio('horn.mp3')

function horn(){
  sound.play();
  sound.playbackRate = 1.5
  sound.volume = 0.5
}

let suara = new Audio('backsound.mp3')
suara.volume = 0.5


let lose = new Audio('gameOver.mp3')

let score = 0;

// Fungsi untuk menampilkan skor
function drawScore() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Fungsi untuk menambah skor
function increaseScore() {
    score += 5; // Atur skor sesuai dengan preferensi Anda
}

// Fungsi untuk mereset skor
function resetScore() {
    score = 0;
}

// Variabel untuk menyimpan posisi vertikal latar belakang
let backgroundY = 0;

// Draw background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, backgroundY - canvas.height, canvas.width, canvas.height);
}

// Event listeners for car movement using buttons
document.getElementById('moveLeft').addEventListener('click', function() {
    if (car.x > 0) {
        car.x -= 40;
    }
});

document.getElementById('moveRight').addEventListener('click', function() {
    if (car.x < canvas.width - car.width) {
        car.x += 40;
    }
});

// Array untuk menyimpan mobil tambahan
const otherCars = [];

// Fungsi untuk membuat mobil tambahan secara acak
function createOtherCar() {
    const otherCar = {
        x: Math.random() * (canvas.height + car.width),
        y: -200, // Mobil akan muncul di atas layar
        width: 100,
        height: 50,
        speed: 7
    };
    otherCars.push(otherCar);
}

// Fungsi untuk menggambar mobil tambahan
function drawOtherCars() {
  
    otherCars.forEach(function(otherCar) {
        ctx.drawImage(enemy, otherCar.x, otherCar.y, otherCar.width, otherCar.height);
    });
}

// Fungsi untuk memperbarui posisi mobil tambahan
function updateOtherCars() {
    otherCars.forEach(function(otherCar) {
        otherCar.y += otherCar.speed;
        if (otherCar.y > canvas.height) {
            otherCars.splice(otherCars.indexOf(otherCar), 1); // Hapus mobil jika sudah di bawah layar
        }
    });
}

// Fungsi untuk mendeteksi tabrakan
function detectCollision() {
    otherCars.forEach(function(otherCar) {
        if (car.x < otherCar.x + otherCar.height &&
            car.x + car.height > otherCar.x &&
            car.y < otherCar.y + otherCar.height &&
            car.y + car.height > otherCar.y) {
            // Tabrakan terdeteksi, reset game
            lose.play();
            suara.pause();
            alert('Yahh nabrak, maen yang bener nyet')
            resetGame();
        }
    });
}

// Fungsi untuk mereset game
function resetGame() {
  resetScore();
    // Reset posisi mobil utama
    car.x = canvas.width / 2 - car.width / 2;
    car.y = canvas.height - 100;
    // Hapus semua mobil tambahan
    otherCars.length = 0;
}




// Membuat mobil tambahan secara acak setiap beberapa detik
setInterval(function() {
    createOtherCar();
}, 1500);



suara.loop = true;


// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();


// Optional: Add functionality to toggle sidebar
document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');

  sidebar.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    content.classList.toggle('active');
  });
});

function closeSidebar() {
  
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  
  
  sidebar.classList.add('closed');
  openBtn.style.display = 'block';
}

function openSidebar() {
  
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  
  
  sidebar.style.display = 'block'
  sidebar.classList.remove('closed');
  openBtn.style.display = 'none'
  
}

function kirim(){
   const url = `https://wa.me/6285885497377?text=Halo, nama saya ${nama.value}, ${pesan.value}`
   
   window.open(url)
  }
