const play_btn = document.getElementsByClassName("play-pause")[0];
const reset_btn = document.getElementsByClassName("reset")[0];
const lap_btn = document.getElementsByClassName("lap")[0];
let flag = false;
let timeInterval;
let resumeTime = 0;
let elapsedTime = 0;
let startTime = 0;

play_btn.addEventListener("click", function () {
  if(flag){
    play_btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    stopInterval();
    return;
  }
  play_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  lap_btn.style.visibility = "visible";
  reset_btn.style.visibility = "visible";
  if(startTime==0){
    startTime = Date.now();
  } else{
    startTime = Date.now() - elapsedTime; 
  }
  timeInterval = setInterval(function () {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.querySelector("h2").textContent = formattedTime;
  }, 10);
  flag = true;
});

reset_btn.addEventListener("click", function(){
    clearInterval(timeInterval);
    flag = false;
    play_btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    document.querySelector("h2").textContent = "00:00:00";
    elapsedTime = 0;
})



function stopInterval(){
    clearInterval(timeInterval);
    flag = false;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((time % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
