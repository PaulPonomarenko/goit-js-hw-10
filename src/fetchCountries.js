const BASE_URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,flags,capital,population,languages';
function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`).then(response =>
    response.json()
  );
}

export { fetchCountries };
