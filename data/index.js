import { } from './flags.js';

let containerHtml = document.querySelector('.container__weather');
const cityHtml = document.getElementById('selectCity'),
btnHtml = document.getElementById('btn'),
apiKey = 'e00a78e1adf4a75d931dfc5a07b7a449';


btnHtml.addEventListener('click',()=>{
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityHtml.value}&appid=${apiKey}`;

    const apiRequest = async () => {
      const response = await fetch(urlApi);
3 
      if (!response.ok) throw new Error(`HTTP ERORR PROPIO!!! status: ${response.status}`);
      console.log(response)
    } 
    apiRequest();
});


