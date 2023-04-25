import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onEvent, DEBOUNCE_DELAY));
function onEvent(event) {
  const country = input.value.trim();
  if (country.length === 0) {
    countryContainer.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(country)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        addMarkup(data);
      }
    })
    .catch(error => {
      if (error.message === '404') {
        countryContainer.innerHTML = '';
        countryList.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
      }
    });
}

function addMarkup(data) {
  if (data.length === 1) {
    countryList.innerHTML = '';
    renderCountriesName(data);
  } else {
    countryContainer.innerHTML = '';
    renderFlagName(data);
  }
}

function renderFlagName(data) {
  const markupList = data
    .map(({ flags, name }) => {
      return `<li class = "li-item">
                <img class ="country-flag" src ="${flags.svg}" alt = "${flags.alt} " >
                <h3 class = "country-name-low">${name.official}</h3>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markupList;
}

function renderCountriesName(data) {
  const markupContainer = data
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
  countryContainer.innerHTML = markupContainer;
}
