export function getData(url) {
    return fetch(url).then(response => response.json());
}


export function parseData(data, times) {
    console.log(data);
    let now = new Date(data.referenceTime);
    let currentHour = now.getHours();
    let currentDate = now.getDate();
    let forecastsToday = [];
    let forecastsTomorrow = [];
    let weatherData = data.timeSeries;

    // today 
    for (let i = 0; i < times.length; i++) {
        let idx = 0;
        if (currentHour < times[i]) {
            while (true) {
                let tempDate = new Date(weatherData[idx].validTime);
                if (times[i] === tempDate.getHours()) {
                    forecastsToday.push(weatherData[idx]);
                    break
                }

                idx++
            }
        }
    }

    // tomorrow
    for (let i = 0; i < times.length; i++) {
        let idx = 0;
        while (true) {
            let tempDate = new Date(weatherData[idx].validTime);
            if (times[i] === tempDate.getHours() && tempDate.getDate() == currentDate + 1) {
                forecastsTomorrow.push(weatherData[idx]);
                break
            }
            idx++
        }
    }

    return [forecastsToday, forecastsTomorrow];
}