let timeLeft = 0;
let timerInterval;
const alarmSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

function startTimer() {
    // Don't start a new timer if one is already running
    if (timerInterval) return;
    
    // If time is 0 or not set, get new value from input
    if (timeLeft === 0) {
        const minutes = parseInt(document.getElementById('minutes').value);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Please enter a valid time!');
            return;
        }
        timeLeft = minutes * 60;
    }
    
    timerInterval = setInterval(countdown, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    timeLeft = 0;
    updateDisplay();
    document.getElementById('minutes').value = '';
}

function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        stopTimer();
        timeCompleted();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function timeCompleted() {
    // Önce alarmı başlat
    playAlarmMultipleTimes(3); // 3 kez çalacak
    
    // Tarayıcı penceresini öne getir
    focusBrowser();
    
    // Son olarak pop-up göster
    setTimeout(() => {
        alert('Time completed!');
    }, 500); // Pop-up'ı biraz geciktir ki ses başlayabilsin
}

function focusBrowser() {
    try {
        window.focus();
        
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Time Completed!", {
                body: "Countdown has finished!"
            });
        }
        
        window.moveTo(0, 0);
        window.resizeTo(screen.width, screen.height);
    } catch (e) {
        console.log("Window focus failed:", e);
    }
}

function playAlarmMultipleTimes(times) {
    let playCount = 0;
    
    // Yeni bir ses nesnesi oluştur
    const playSound = () => {
        const sound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        
        sound.addEventListener('ended', () => {
            playCount++;
            if (playCount < times) {
                // Ses bittiğinde ve hedef sayıya ulaşılmadıysa tekrar çal
                setTimeout(() => {
                    playSound();
                }, 500); // Her çalma arasında 500ms bekle
            }
        });

        sound.play().catch(error => {
            console.log("Error playing sound:", error);
        });
    };

    // İlk sesi başlat
    playSound();
}

// Request notification permission when page loads
if ("Notification" in window) {
    Notification.requestPermission();
}

// Update display on initial load
updateDisplay();
