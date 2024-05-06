const driverStandings = "https://ergast.com/api/f1/current/driverStandings.json";
const constructorStandings = "https://ergast.com/api/f1/current/constructorStandings.json";

const table = document.getElementById("drivers-table");
const consTable = document.getElementById("constructor-table");

async function fetchApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}


async function getDriverStandings(url) {
    try {
        const data = await fetchApi(url);

        const drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        return drivers;
    } catch (error) {
        console.error('There was an error with the fetch operation:', error);
    }
}


async function getConstructorStandings(url) {
    try {
        const data = await fetchApi(url);

        const constructors = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        return constructors;
    } catch (error) {
        console.error('There was an error with the fetch operation:', error);
    }
}


function driverTableTemplate() {
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
    
}

function constructorTableTemplate() {
    const headers = ['Position', 'Constructor', 'Points', 'Wins'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    consTable.appendChild(thead);
    
}


getDriverStandings(driverStandings).then(drivers => {
    driverTableTemplate();
    const tbody = document.createElement('tbody');
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

getConstructorStandings(constructorStandings).then(constructors => {
    constructorTableTemplate();
    const tbody = document.createElement('tbody');
    constructors.forEach(constructor => {
        const row = document.createElement('tr');

        const positionCell = document.createElement('td');
        positionCell.textContent = constructor.position;
        row.appendChild(positionCell);

        const constructorCell = document.createElement('td');
        constructorCell.textContent = constructor.Constructor.name;
        row.appendChild(constructorCell);

        const pointsCell = document.createElement('td');
        pointsCell.textContent = constructor.points;
        row.appendChild(pointsCell);

        const winsCell = document.createElement('td');
        winsCell.textContent = constructor.wins;
        row.appendChild(winsCell);

        tbody.appendChild(row);
    });
    consTable.appendChild(tbody);
})