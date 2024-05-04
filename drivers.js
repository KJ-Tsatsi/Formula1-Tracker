const driverStandings = "https://ergast.com/api/f1/current/driverStandings.json";

const table = document.getElementById("drivers-table");

async function fetchApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}


async function getStandings(url) {
    try {
        const data = await fetchApi(url);

        const drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        // const standings
        // console.log(data);
        console.log(drivers);
        return drivers;
    } catch (error) {
        console.error('There was an error with the fetch operation:', error);
    }
}


const headers = ['Position', 'Name', 'Points', 'Wins'];
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
});

thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = document.createElement('tbody');


getStandings(driverStandings).then(drivers => {
    drivers.forEach(driver => {
        const row = document.createElement('tr');

        const positionCell = document.createElement('td');
        positionCell.textContent = driver.position;
        row.appendChild(positionCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = driver.Driver.givenName +' '+driver.Driver.familyName;
        row.appendChild(nameCell);

        const pointsCell = document.createElement('td');
        pointsCell.textContent = driver.points;
        row.appendChild(pointsCell);

        const winsCell = document.createElement('td');
        winsCell.textContent = driver.wins;
        row.appendChild(winsCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);
});