const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get('driverId');


fetch(`https://ergast.com/api/f1/2024/drivers/${driverId}/results.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('driver-name').textContent = 
        data.MRData.RaceTable.driverId;

        document.getElementById('results').textContent = JSON.stringify(data.MRData.RaceTable.Races, null, 2);
    });