import { flags } from "./flags.js";

const getFlagCountry = (country) => {
   let flag = flags.find( (f) => f.name === country)?.url; 
   if (flag === undefined) flag = 'ramdom';
   return flag
}

let containerHtml = document.querySelector(".container__weather");
const cityHtml = document.getElementById("selectCity"),
  btnHtml = document.getElementById("btn"),
  apiKey = "e00a78e1adf4a75d931dfc5a07b7a449";

btnHtml.addEventListener("click", () => {
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityHtml.value}&appid=${apiKey}`;

  const apiRequest = async () => {
    const response = await fetch(urlApi);

    if (!response.ok)
      throw new Error(`HTTP ERORR PROPIO!!! status: ${response.status}`);
    const data = await response.json();
    console.log(data)
    let title = data.name;
    let temp = Math.round(data.main.temp - 273.15);
    let tempMax = Math.round(data.main.temp_max - 273.15);
    let tempMin = Math.round(data.main.temp_min - 273.15);
    let country = data.sys.country;
    let imgFlag = getFlagCountry(country);
    let containerCity = `
    <div class="container">
        <div class=""><hr></div>
        <div class="container__weather">
            <h1 class="container__weather__title">${data.name}</h1>
            <p><b>Pais:</b>${country} </p>
            <img src="${imgFlag}">
        <div>

        <div>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <p>
                ${data.weather[0].main} <br>
                ${data.weather[0].description}
            </p>
            <p>
                temperatu: ${temp} °
            </p>

            <p><b>Max - Min</b>temperatu: ${tempMax}/${tempMin} °</p>
        </div>
    

        <p>
            <b>Latitud:</b> ${data.coord.lat} <br>
            <b>Longitud:</b> ${data.coord.lon}
        </p>
    </div>
    `;

    containerHtml.innerHTML = containerCity;
  };

  apiRequest();
  /*  <img src="${imgFrag}"></img> */
});
