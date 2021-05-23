import { getData, parseData } from "./dataHandler.js";
import { createWeatherTable, createHeading } from "./domHandler.js";

function main() {
    let weatherElement = document.querySelector("aside");
    let heading = createHeading("Väder", 2);
    weatherElement.appendChild(heading);


    getData("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json").then(response =>

        parseData(response, [6, 12, 18])).then(data => {
        if (data[0].length > 0) {
            let tableToday = createWeatherTable(data[0]);
            let headingToday = createHeading("Idag", 3);
            weatherElement.appendChild(headingToday);
            weatherElement.appendChild(tableToday);
        }

        let tableTomorrow = createWeatherTable(data[1]);
        let headingTomorrow = createHeading("Imorgon", 3);
        weatherElement.appendChild(headingTomorrow);
        weatherElement.appendChild(tableTomorrow)
    });
}

main();