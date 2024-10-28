let interval;
let isRunning = false;
let remainingTime = 0;

// Geri sayımı başlatma ve durdurma fonksiyonu
function toggleCountdown() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        document.getElementById('startStopBtn').innerText = 'Start';
    } else {
        startCountdown();
        isRunning = true;
        document.getElementById('startStopBtn').innerText = 'Stop';
    }
}

// Geri sayımı başlatma fonksiyonu
function startCountdown() {
    interval = setInterval(countdown, 1000);
}

// Geri sayımı resetleme fonksiyonu
function resetCountdown() {
    clearInterval(interval);
    isRunning = false;
    remainingTime = 0;
    document.getElementById('startStopBtn').innerText = 'Başlat';
    updateDisplay(0, 0, 0, 0);
}

// Geri sayımı ayarlama fonksiyonu
function setCountdown() {
    const days = parseInt(document.getElementById('setDays').value) || 0;
    const hours = parseInt(document.getElementById('setHours').value) || 0;
    const minutes = parseInt(document.getElementById('setMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('setSeconds').value) || 0;

    remainingTime = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
    updateDisplay(days, hours, minutes, seconds);
}

// Geri sayım fonksiyonu
function countdown() {
    if (remainingTime <= 0) {
        clearInterval(interval);
        isRunning = false;
        document.getElementById('startStopBtn').innerText = 'Start';
        return;
    }

    remainingTime--;

    const days = Math.floor(remainingTime / (24 * 60 * 60));
    const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
    const seconds = remainingTime % 60;

    updateDisplay(days, hours, minutes, seconds);
}

// Ekrandaki değerleri güncelleme fonksiyonu
function updateDisplay(days, hours, minutes, seconds) {
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
