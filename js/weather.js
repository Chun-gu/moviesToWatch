const API_KEY = "640c614fd30f42e65394163eece96e9c";

function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const cityName = document.querySelector("#weather span:nth-child(2)");
      const temperature = document.querySelector("#weather span:last-child");
      
      console.log(weather)
      weather.innerText = data.weather[0].main;
      cityName.innerText = data.name;
      temperature.innerText = data.main.temp;
    });
}

function onError() {
  alert("위치 정보를 얻을 수 없습니다.")
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
