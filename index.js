let timer;
let isRunning = false;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let pausedCount = 0;
let lapTimings = [];
let totalPausedTime = 0;
let startTimeStamp; // Timestamp for starting the timer

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(updateTime, 10);
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";
  document.getElementById("lapBtn").style.display = "inline-block";
  document.getElementById("resetBtn").style.display = "inline-block";
  isRunning = true;
  startTimeStamp = Date.now(); // Capture start timestamp for total timer time
}

function pauseTimer() {
  clearInterval(timer);
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resumeBtn").style.display = "inline-block";
  isPaused = true;
  pausedCount++;
  totalPausedTime += Date.now() - startTime; // Accumulate paused time
  updateInfo(); // Update additional info
}

function resumeTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(updateTime, 10);
  document.getElementById("resumeBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";
  isPaused = false;
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById("timer").textContent = "00 : 00 : 00. 000";
  elapsedTime = 0;
  isRunning = false;
  isPaused = false;
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resumeBtn").style.display = "none";
  document.getElementById("lapBtn").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
  pausedCount = 0;
  lapTimings = [];
  totalPausedTime = 0;
  startTimeStamp = null; // Reset start timestamp
  updateLapTable();
  updateInfo(); // Update additional info
}

function recordLap() {
  lapTimings.push(new Date(elapsedTime).toISOString().substr(11, 11));
  updateLapTable();
  updateInfo(); // Update additional info
}
function updateTime() {
  let currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  // Extract hours, minutes, seconds, and milliseconds
  let hours = Math.floor((elapsedTime / (3600 * 1000)) % 24);
  let minutes = Math.floor((elapsedTime / (60 * 1000)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor(elapsedTime % 1000);

  // Format the time string with leading zeros for hours, minutes, seconds, and pad milliseconds with 3 digits
  let formattedTime = `
    <span class="timer-part">${hours.toString().padStart(2, "0")}</span>
    <span class="timer-separator">:</span>
    <span class="timer-part">${minutes.toString().padStart(2, "0")}</span>
    <span class="timer-separator">:</span>
    <span class="timer-part">${seconds.toString().padStart(2, "0")}</span>
    <span class="timer-separator">.</span>
    <span class="timer-part">${milliseconds.toString().padStart(3, "0")}</span>
  `;
  document.getElementById("timer").innerHTML = formattedTime;

  // Update total time on timer (including paused time)
  let totalTimeOnTimer = currentTime - startTimeStamp + totalPausedTime;
  document.getElementById("totalTimeOnTimer").textContent = formatTime(totalTimeOnTimer);
}

function updateTime() {
  let currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  // Extract hours, minutes, seconds, and milliseconds
  let hours = Math.floor((elapsedTime / (3600 * 1000)) % 24);
  let minutes = Math.floor((elapsedTime / (60 * 1000)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor(elapsedTime % 1000);

  // Format the time string with leading zeros for hours, minutes, seconds, and pad milliseconds with 3 digits
  let formattedTime = `
    <span class="timer-part">${hours.toString().padStart(2, "0")}</span>
    <span class="timer-separator">:</span>
    <span class="timer-part">${minutes.toString().padStart(2, "0")}</span>
    <span class="timer-separator">:</span>
    <span class="timer-part">${seconds.toString().padStart(2, "0")}</span>
    <span class="timer-separator">.</span>
    <span class="timer-part">${milliseconds.toString().padStart(3, "0")}</span>
  `;
  document.getElementById("timer").innerHTML = formattedTime;

  // Update total time on timer (including paused time)
  let totalTimeOnTimer = currentTime - startTimeStamp + totalPausedTime;
  document.getElementById("totalTimeOnTimer").textContent = formatTime(totalTimeOnTimer);
}


function updateLapTable() {
  let tableBody = document.getElementById("lapTableBody");
  tableBody.innerHTML = "";
  lapTimings.forEach((lapTime, index) => {
    let row = tableBody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.textContent = index + 1;
    cell2.textContent = lapTime;
  });
}

// Function to update additional information
function updateInfo() {
    document.getElementById("pausedCount").textContent = `Paused: ${pausedCount}`;
    document.getElementById("totalLaps").textContent = `Laps: ${lapTimings.length}`;
}
  