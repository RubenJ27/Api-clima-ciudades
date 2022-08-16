import { cities } from "./cities.js";

let selectHtml = document.getElementById("selectCity");

const getCities = (theCity) => {
  return new Promise((resolve, reject) => {
    let city = cities[theCity];
    (city) ? resolve(city) : reject(' ');
  });
};

const presentCities = async () => {
    let dropdown = [];
    for (let i = 0; i < cities.length; i++) {
       dropdown[i] = await getCities(i);
       let optionHtml = `<option value="${dropdown[i].city}">${dropdown[i].city}</option>`;
       selectHtml.innerHTML += optionHtml;
    }
};

presentCities();