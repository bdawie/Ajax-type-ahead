const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const searchInput = document.querySelector('.search');

const suggestionsList = document.querySelector('.suggestions');

suggestionsList.innerHTML = '';

fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

function filterPlaces(filterWord, cities) {
    const regex = new RegExp(filterWord, 'gi');
    return cities.filter(place => matchWord(place, regex));
}

function matchWord(place, regex) {
    return place.city.match(regex) || place.state.match(regex);
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
function displayMatches() {
    // Old Solution

    // if(this.value.trim() !== '') {
    //     const foundPlaces = searchPlace(this.value, cities);
    //     const regex = new RegExp(this.value);
    //     suggestionsList.innerHTML = '';
    //     for(let place of foundPlaces ) {
    //        const hlCity = place.city.replace(regex,`<span class="hl">${this.value}</span>`);
    //        const hlState = place.state.replace(regex,`<span class="hl">${this.value}</span>`);
    //         suggestionsList.innerHTML+= `<li><span class="name">${hlCity}, ${hlState}</span> <span class="population">${place.population}</span></li>`;
    //     }
    // }

    // if(this.value === '') suggestionsList.innerHTML = '';

    // New Solution

    if (this.value.trim() !== '') {
        const foundPlaces = filterPlaces(this.value, cities);
        const valueRegex = new RegExp(this.value, 'gi');

        const htmlText = foundPlaces.map(place => {
            const hlCity = place.city.replace(valueRegex, `<span class="hl">${this.value}</span>`);
            const hlState = place.state.replace(valueRegex, `<span class="hl">${this.value}</span>`);
            return `<li><span class="name">${hlCity}, ${hlState}</span> <span class="population">${numberWithCommas(place.population)}</span></li>`;
        }).join('');
        suggestionsList.innerHTML = htmlText;
    } else {
        suggestionsList.innerHTML = '';
    }
}
searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('change', displayMatches);
