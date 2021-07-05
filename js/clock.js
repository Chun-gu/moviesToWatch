const clock = document.getElementById("time");
function getTIme() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours} : ${mins} : ${secs}`;
}

getTIme();
setInterval(getTIme, 1000);
