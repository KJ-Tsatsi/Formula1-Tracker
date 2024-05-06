const lastRace = document.getElementById("last-race");
const date = document.getElementById("race-date");
const lastWinner = document.getElementById("last-winner");

const lastRaceData = "http://ergast.com/api/f1/current/last/results.json";



async function fetchApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function handleData(url) {
    try {
        const data = await fetchApi(url);

        const raceName = data.MRData.RaceTable.Races[0].raceName;
        const raceDate = data.MRData.RaceTable.Races[0].date;
        const raceWinner = data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +" "+
                           data.MRData.RaceTable.Races[0].Results[0].Driver.familyName;

        const raceData = [raceName, raceDate, raceWinner];
        return raceData;
    } catch (error) {
        console.error('There was an error with the fetch operation:', error);
    }
}

handleData(lastRaceData).then(raceData => {
    lastRace.textContent = raceData[0];
    date.textContent = raceData[1];
    lastWinner.textContent = raceData[2];
});


