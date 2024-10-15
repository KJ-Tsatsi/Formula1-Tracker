const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get('driverId');

fetch(`https://ergast.com/api/f1/2024/drivers/${driverId}/results.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('driver-name').textContent = data.MRData.RaceTable.driverId.toUpperCase();
        console.log(data.MRData.RaceTable);
        const resultsContainer = document.getElementById('results');
        data.MRData.RaceTable.Races.forEach(race => {
            const div = document.createElement('div');
            div.className = 'results';
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.marginBottom = '20px';
            table.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.15)';
            const caption = document.createElement('caption');
            caption.textContent = `${race.season} ${race.raceName}`;
            table.appendChild(caption);
            const thead = document.createElement('thead');
            thead.style.backgroundColor = '#008080';
            thead.style.color = 'white';
            const headers = ['Pos', 'No', 'Driver', 'Constructor', 'Laps', 'Grid', 'Time', 'Status', 'Points'];
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                th.style.padding = '15px';
                th.style.textAlign = 'left';
                th.style.borderBottom = '1px solid #ddd';
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            race.Results.forEach(result => {
                const row = document.createElement('tr');
                row.style.transition = 'background-color 0.3s ease';
                row.onmouseover = function () {
                    this.style.backgroundColor = '#ddd';
                    this.style.cursor = 'pointer';
                    this.style.transform = 'scale(1.02)';
                    this.style.transition = 'transform 0.3s ease';
                }
                row.onmouseout = function () {
                    this.style.backgroundColor = '';
                    this.style.transform = 'scale(1)';
                }
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
                    td.style.padding = '15px';
                    td.style.textAlign = 'left';
                    td.style.borderBottom = '1px solid #ddd';
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            div.appendChild(table);
            resultsContainer.appendChild(div);
        });
    });
