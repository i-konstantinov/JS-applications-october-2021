function attachEvents() {
    document.getElementById('submit').addEventListener('click', displayForecast);
}

attachEvents();

const symbols = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    degrees: '&#176;'
}

async function displayForecast() {
    const Btn = document.getElementById('submit');
    Btn.value = 'Loading...';

    const forecastBlock = document.getElementById('forecast');
    forecastBlock.style.display = 'none';

    const currentConditionsSection = forecastBlock.children[0];
    currentConditionsSection.innerHTML = '<div class="label">Current conditions</div>';

    const upcomingForecastsSection = forecastBlock.children[1];
    upcomingForecastsSection.innerHTML = '<div class="label">Three-day forecast</div>';

    const locationInput = document.getElementById('location');
    const [currentData, upcomingData] = await getForecastData(locationInput.value);

    currentConditionsSection.appendChild(await composeTodaysForecast(currentData));
    upcomingForecastsSection.appendChild(await composeUpcomingForecast(upcomingData));

    locationInput.value = '';
    forecastBlock.style.display = 'block';
    Btn.value = 'Get Weather';
}

async function getForecastData(locationName) {
    const locationCode = await getLocationCode(locationName);
    const [currentForecast, upcomingForecast] = await Promise.all([getCurrentForecast(locationCode), getUpcomingForecast(locationCode)]);
    return [currentForecast, upcomingForecast];
}

async function getLocationCode(name) {
    const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
    const locations = await response.json();
    const wanted = Object.values(locations).filter(day => day.name == name)[0];
    return wanted.code;
}

async function getCurrentForecast(code) {
    const resp = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
    return await resp.json();
}

async function getUpcomingForecast(code) {
    const resp = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
    return await resp.json();
}

async function composeTodaysForecast(today) {
    const spanConditionSymbol = document.createElement('span');
    spanConditionSymbol.className = "condition symbol";
    spanConditionSymbol.innerHTML = symbols[today.forecast.condition];

    const spanConditionData = document.createElement('span');
    spanConditionData.className = 'condition';
    spanConditionData.innerHTML = `<span class="forecast-data">${today.name}</span>
    <span class="forecast-data">${today.forecast.low}${symbols.degrees}/${today.forecast.high}${symbols.degrees}</span>
    <span class="forecast-data">${today.forecast.condition}</span>`;

    const divForecasts = document.createElement('div');
    divForecasts.className = "forecasts";
    divForecasts.appendChild(spanConditionSymbol);
    divForecasts.appendChild(spanConditionData);

    return divForecasts;
}

async function composeUpcomingForecast(nextDays) {
    const divForecastInfo = document.createElement('div');
    divForecastInfo.className = 'forecast-info';

    for (let day of nextDays.forecast) {
        const nextDay = document.createElement('span');
        nextDay.className = 'upcoming';

        const symbol = document.createElement('span');
        symbol.className = 'symbol';
        symbol.innerHTML = symbols[day.condition];
        nextDay.appendChild(symbol);

        const degrees = document.createElement('span');
        degrees.className = 'forecast-data';
        degrees.innerHTML = `${day.low}${symbols.degrees}/${day.high}${symbols.degrees}`;
        nextDay.appendChild(degrees);

        const condition = document.createElement('span');
        condition.className = 'forecast-data';
        condition.innerText = day.condition;
        nextDay.appendChild(condition);

        divForecastInfo.appendChild(nextDay);
    }

    return divForecastInfo;
}
