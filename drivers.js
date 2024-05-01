const driverStandings = "https://ergast.com/api/f1/current/driverStandings";

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
        // const standings
        console.log(data);
    } catch (error) {
        console.error('There was an error with the fetch operation:', error);
    }
}

