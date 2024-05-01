const upcomingRace = document.getElementById("upcoming_race");

const calendar = "http://ergast.com/api/f1/2024/6.json";



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
        const circuitName = data.MRData.RaceTable.Races[0].Circuit.circuitName;
        const freePracDate = data.MRData.RaceTable.Races[0].FirstPractice.date;
        const raceDay = data.MRData.RaceTable.Races[0].date;

        // console.log(circuitName);
        // console.log(`${freePracDate} - ${raceDay}`);

        return circuitName;
    } catch (error) {
        console.error('There was an error with the fetch operation:', error);
    }
}

handleData(calendar).then(circuitName => {
    upcomingRace.textContent = circuitName;
});



