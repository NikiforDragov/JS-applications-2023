function attachEvents() {
    const inputLocation = document.querySelector('input#location');
    const getWeatherBtn = document.querySelector('input#submit');
    const forecast = document.querySelector('div#forecast');
    const currentWeather = document.querySelector('div#current');
    const upcomingWeather = document.querySelector('div#upcoming');

    const conditions = {
        Sunny: '&#x2600',
        'Partly sunny': '&#x26C5',
        Overcast: '&#x2601',
        Rain: '&#x2614',
        Degrees: '&#176',
    }

    getWeatherBtn.addEventListener('click', getWeather);

    function getWeather() {
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then((res) => res.json())
            .then((data) => {
                const cityIndex = data.findIndex(el => el.name === inputLocation.value);
                forecast.style.display = 'block';

                if (cityIndex === -1) {
                    throw new Error()
                }
                let cityCode = data[cityIndex].code;

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const forecast = document.createElement('div');
                        forecast.className = 'forecasts';

                        const conditionSymbol = document.createElement('span');
                        conditionSymbol.className = 'condition symbol';
                        conditionSymbol.innerHTML = conditions[data.forecast.condition];
                        forecast.appendChild(conditionSymbol);

                        let condition = document.createElement('span');
                        condition.className = 'condition'

                        const span1 = document.createElement('span');
                        span1.className = 'forecast-data';
                        span1.textContent = data.name
                        condition.appendChild(span1)

                        const span2 = document.createElement('span');
                        span2.className = 'forecast-data'
                        span2.innerHTML = `${data.forecast.low}${conditions.Degrees}/${data.forecast.high}${conditions.Degrees}`
                        condition.appendChild(span2)

                        const span3 = document.createElement('span');
                        span3.className = 'forecast-data'
                        span3.textContent = data.forecast.condition;
                        condition.appendChild(span3)

                        forecast.appendChild(condition);
                        currentWeather.appendChild(forecast);
                    })

                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const forecastInfo = document.createElement('div');
                        forecastInfo.className = 'forecast-info';
                        
                        
                        data.forecast.forEach(el => {
                            const upcoming = document.createElement('span');
                            upcoming.className = 'upcoming';

                            const symbol = document.createElement('span');
                            symbol.className = 'symbol';
                            symbol.innerHTML = conditions[el.condition];
                            upcoming.appendChild(symbol);

                            const fcData = document.createElement('span');
                            fcData.className = 'forecast-data';
                            fcData.innerHTML = `${el.low}${conditions.Degrees}/${el.high}${conditions.Degrees}`;
                            upcoming.appendChild(fcData);

                            const fcData2 = document.createElement('span');
                            fcData2.className = 'forecast-data';
                            fcData2.textContent = el.condition;
                            upcoming.appendChild(fcData2);

                            forecastInfo.appendChild(upcoming)
                            upcomingWeather.appendChild(forecastInfo)
                        })
                    })
            })
    }
}

attachEvents();