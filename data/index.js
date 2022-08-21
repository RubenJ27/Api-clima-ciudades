import { flags } from "./flags.js";

const getFlagCountry = (country) => {
  let flag = flags.find((f) => f.name === country)?.url;
  if (flag === undefined) flag = "http://adrianapolis.com/blog/wp-content/uploads/2011/11/signo_interrogacion.gif";
  return flag;
};

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
    /* console.log(data); */
    let title = data.name;
    let temp = Math.round(data.main.temp - 273.15);
    let tempMax = Math.round(data.main.temp_max - 273.15);
    let tempMin = Math.round(data.main.temp_min - 273.15);
    let country = data.sys.country;
    let imgFlag = getFlagCountry(country);
    let containerCity = `
    <div class="container__weather__items">
        
        <div class="container__weather__item">
            <h1 class="container__weather__item__title">${data.name}</h1>
            <div class="container__weather__item__country">
              <p class="container__weather__item__country-text"><b>Pais: </b>${country} </p>
              <img class="container__weather__item__flag" src="${imgFlag}">
            </div>
            <p class="container__weather__item__coordinates">

              <b class="container__weather__item__coordinates-latitude">Latitud:</b> ${data.coord.lat} <br>
              <b class="container__weather__item__coordinates-longitude">Longitud:</b> ${data.coord.lon}
            </p>
        </div>

        <div class="container__weather__item">
            <div class="container__weather__item__imgs">
              <img class="container__weather__item__img" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            </div>
            <p class="container__weather__item__temperature">
                Temp: ${temp} °
            </p>

            <p class="container__weather__item__temperature-min-max"><b>Max - Min: </b>Temp: ${tempMax}/${tempMin} °</p>

            <p class="container__weather__item__description-main">
                ${data.weather[0].main} <br>
                ${data.weather[0].description}
            </p>
            
        </div>
    
    </div>
    `;

    containerHtml.innerHTML = containerCity;
  };

  apiRequest();
  /*  <img src="${imgFrag}"></img> */
});
