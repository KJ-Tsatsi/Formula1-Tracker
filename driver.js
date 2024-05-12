const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get('driverId');


fetch(`https://ergast.com/api/f1/2024/drivers/${driverId}/results.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('driver-name').textContent = 
        data.MRData.RaceTable.driverId.toUpperCase();
        console.log(data.MRData.RaceTable);

        const resultsContainer = document.getElementById('results');
        data.MRData.RaceTable.Races.forEach(race => {
            const div = document.createElement('div');
            div.className = 'results';

            const table = document.createElement('table');

            const caption = document.createElement('caption');
            caption.textContent = `${race.season} ${race.raceName}`;
            table.appendChild(caption);

            const thead = document.createElement('thead');
            const headers = ['Pos', 'No', 'Driver', 'Constructor', 'Laps', 'Grid', 'Time', 'Status', 'Points'];
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            race.Results.forEach(result => {
                const row = document.createElement('tr');
                const cells = [
                    result.position,
                    result.number,
                    `${result.Driver.givenName} ${result.Driver.familyName}`,
                    result.Constructor.name,
                    result.laps,
                    result.grid,
                    result.Time ? result.Time.time : '',
                    result.status,
                    result.points
                ];
                cells.forEach(cellText => {
                    const td = document.createElement('td');
                    td.textContent = cellText;
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);


            div.appendChild(table);
            resultsContainer.appendChild(div);
        });
    });
