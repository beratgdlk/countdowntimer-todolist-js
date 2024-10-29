let timeLeft = 0;
let timerInterval = null;

// Timer Functions
function startTimer() {
    if (timerInterval) return;
    
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    if (minutes === 0 && seconds === 0) {
        alert('Please enter a valid time!');
        return;
    }
    
    timeLeft = (minutes * 60) + seconds;
    timerInterval = setInterval(countdown, 1000);
}

function countdown() {
    if (timeLeft <= 0) {
        stopTimer();
        countdownComplete();
        return;
    }
    
    timeLeft--;
    updateDisplay();
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
    document.getElementById('seconds').value = '';
    
    // Sesi durdur
    const audio = document.getElementById('alarmSound');
    audio.pause();
    audio.currentTime = 0;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Ses çalma fonksiyonu
function playAlarm() {
    const audio = document.getElementById('alarmSound');
    audio.currentTime = 0; // Sesi baştan başlat
    audio.play();
}

// Geri sayım bittiğinde
function countdownComplete() {
    const audio = document.getElementById('alarmSound');
    
    // Sesi en düşük seviyeden başlat
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play();
    
    let volumeLevel = 0.1;
    const volumeInterval = setInterval(() => {
        // Ses seviyesini kademeli olarak artır
        volumeLevel += 0.1;
        audio.volume = Math.min(volumeLevel, 1.0);
        
        // Maksimum ses seviyesine ulaşıldığında durdur
        if (volumeLevel >= 1.0) {
            clearInterval(volumeInterval);
        }
    }, 1000); // Her saniyede bir ses seviyesini artır
    
    // Popup'ı göster
    Swal.fire({
        title: 'Deadline Expired!',
        text: 'The countdown is complete.',
        icon: 'info',
        confirmButtonText: 'Okay'
    }).then((result) => {
        if (result.isConfirmed) {
            // Popup kapandıktan sonra sesi tekrar başlat
            audio.volume = 0.1;
            volumeLevel = 0.1;
            audio.currentTime = 0;
            audio.play();
            
            // Sesi tekrar kademeli olarak artır
            const newVolumeInterval = setInterval(() => {
                volumeLevel += 0.1;
                audio.volume = Math.min(volumeLevel, 1.0);
                
                if (volumeLevel >= 1.0) {
                    clearInterval(newVolumeInterval);
                }
            }, 1000);
        }
    });
}

// Todo List Functions
function addToDo() {
    const input = document.getElementById('toDoInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    const li = document.createElement('li');
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed', this.checked);
    });
    
    // Task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = text;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = function() {
        li.remove();
    };
    
    // Append elements
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    document.getElementById('toDoList').appendChild(li);
    input.value = '';
}

// Add task with Enter key
document.getElementById('toDoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addToDo();
    }
});
