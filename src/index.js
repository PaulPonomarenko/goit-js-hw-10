import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
const input = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
const countryResult = fetchCountries();
console.log(countryResult);
input.addEventListener('input', debounce(onEvent, DEBOUNCE_DELAY));
function onEvent(event) {
  fetchCountries(input.value).then(renderCountriesName);
}

function renderCountriesName(data) {
  const markup = data
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class = "country-header">
                <img class ="country-flag" src ="${flags.svg}" alt = "${
        flags.alt
      } height = "50" width = "50"" >
                <h2 class = "country-name">${name.official}</h2>
            </div>
            <ul class = "country-result">
            <li class ="result-item">
                <b>Capital:</b>
                <span class="result-span">${capital}</span>
            </li>
            <li class ="result-item">
                <b>Population:</b>
                <span class="result-span">${population}</span>
            </li>
            <li class ="result-item">
                <b>Languages:</b>
                <span class="result-span">${Object.values(languages)}</span>
            </li>
            
            </ul>`;
    })
    .join('');
  countryContainer.innerHTML = markup;
}
