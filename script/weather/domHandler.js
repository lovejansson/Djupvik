export function createWeatherTable(data) {
    let table = document.createElement("table");
    let rows = createTableRows(data.length + 1);
    let heads = createTableHeads(4);

    fillTableHeads(["Kl", "Himmel", "Temp", "Vind m/s"], heads);

    for (const head of heads) {
        rows[0].appendChild(head);
    }

    fillTableRows(data, rows);

    for (const row of rows) {
        table.appendChild(row);
    }

    return table
}


export function createHeading(content, lvl) {
    let heading = document.createElement("h" + lvl);
    heading.innerHTML = content;

    return heading;
}


function createTableRows(num) {
    let rows = [];

    for (let i = 0; i < num; i++) {
        rows.push(document.createElement("tr"));
    }
    return rows
}


function createTableHeads(num) {
    let heads = [];

    for (let i = 0; i < num; i++) {
        heads.push(document.createElement("th"));
    }

    return heads
}


function fillTableHeads(content, heads) {
    for (let i = 0; i < heads.length; i++) {
        heads[i].innerHTML = content[i];
    }
}


function fillTableRows(data, rows) {
    let weatherDescr = ["Klar himmel", "Lätt molnighet", "Varierad molnighet", "Halvklart", "Molnigt", "Mulet", "Dimma", "Lätta regnskurar", "Regnskurar", "Kraftiga regnskurar", "Åskväder", "Lätta snöblandade regnskurar", "Snöblandade regnskurar", "Kraftiga snöblandade regnskurar", "Lätta snöskurar", "Snöskurar", "Kraftiga snöskurar", "Duggregn", "Regn", "Störtskurar", "Åska", "Lätt snöblandat regn", "Snöblandat regn", "Kraftigt snöblandat regn", "Lätt snöfall", "Snöfall", "Kraftigt snöfall"];

    for (let i = 0; i < data.length; i++) {
        let tdTemp = document.createElement("td");
        let tdHour = document.createElement("td");
        let tdWind = document.createElement("td");
        let tdWeather = document.createElement("td");

        let hour = new Date(data[i].validTime).getHours();
        tdHour.innerHTML = hour;

        let wd, ws;

        for (const p of data[i].parameters) {
            switch (p.name) {
                case "t":
                    tdTemp.innerHTML = p.values[0] + "&deg;";
                    tdTemp.setAttribute("aria-label", p.values[0] + " grader");
                    break;
                case "Wsymb2":
                    tdWeather.innerHTML = weatherDescr[p.values[0] - 1];
                    break;
                case "wd":
                    wd = p.values[0];
                    break;
                case "ws":
                    ws = p.values[0];
                    break
            }

            let arrows = createDirectionArrow(wd);

            tdWind.innerHTML = ws + "&nbsp;";
            tdWind.appendChild(arrows[0]);
            tdWind.appendChild(arrows[1]);

            rows[i + 1].appendChild(tdHour);
            rows[i + 1].appendChild(tdWeather);
            rows[i + 1].appendChild(tdTemp);
            rows[i + 1].appendChild(tdWind);
        }
    }
}


function createDirectionArrow(deg) {
    let arrow = document.createElement("span");
    let descr = document.createElement("span");

    arrow.innerHTML = "&#8593;";
    arrow.setAttribute("aria-hidden", "true");
    arrow.style.webkitTransform = `rotate(${deg}deg)`;
    arrow.style.display = "inline-block";
    arrow.style.color = "#11243d";
    arrow.style.fontWeight = "bold";

    descr.innerHTML = deg + " grader";
    descr.classList.add("visually-hidden");

    return [arrow, descr];
}