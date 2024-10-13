let timer;
let timeLeft = 0;
let isPaused = false;
let notificationTimeouts = [];

// Start Timer Functionality
document.getElementById('start-timer').addEventListener('click', function() {
  const inputMinutes = parseInt(document.getElementById('time-input').value);
  if (isNaN(inputMinutes)) {
    alert('Please enter a valid number of minutes');
    return;
  }

  if (isPaused && timeLeft > 0) {
    startTimer(timeLeft);
  } else {
    timeLeft = inputMinutes * 60;
    startTimer(timeLeft);
  }

  isPaused = false;
});

// Pause Timer Functionality
document.getElementById('pause-timer').addEventListener('click', function() {
  clearInterval(timer);
  isPaused = true;
});

// Function to start or resume the timer
function startTimer(duration) {
  clearInterval(timer);

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Time is up!');
    } else {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('timer-display').textContent = `Timer: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

// Task Completion Functionality
const completeButtons = document.querySelectorAll('.complete-btn');
completeButtons.forEach(button => {
  button.addEventListener('click', function() {
    button.parentElement.style.backgroundColor = '#d4edda'; // Change card background color on completion
    button.textContent = 'Completed';
    button.disabled = true;
  });
});

// Set Notification for Each Card
const notificationButtons = document.querySelectorAll('.set-notif-btn');
notificationButtons.forEach((button, index) => {
  button.addEventListener('click', function() {
    const notifInput = button.parentElement.querySelector('.notif-time').value;
    const notifTime = parseInt(notifInput);
    const notifStatus = button.parentElement.querySelector('.notif-status');
    
    if (isNaN(notifTime)) {
      alert('Please enter a valid notification time in minutes.');
      return;
    }

    clearTimeout(notificationTimeouts[index]); // Clear any existing timeout for this task

    notificationTimeouts[index] = setTimeout(() => {
      const taskMessage = `Reminder: ${button.parentElement.querySelector('h3').textContent}`;
      showNotification(taskMessage);
      speak(taskMessage);
    }, notifTime * 60 * 1000); // Time in milliseconds

    notifStatus.textContent = `Notification set for ${notifTime} minutes from now`;
  });
});

// Show visual notification pop-up
function showNotification(message) {
  const notificationPopup = document.getElementById('notification-popup');
  const notificationMessage = document.getElementById('notification-message');
  notificationMessage.textContent = message;
  notificationPopup.classList.remove('hidden');

  setTimeout(() => {
    notificationPopup.classList.add('hidden');
  }, 5000); // Hide after 5 seconds
}

// Voice notification using Web Speech API
function speak(message) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);
}
