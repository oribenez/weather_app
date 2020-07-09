const key = 'ATqPU34AF37RpEgvox5QoAmwwaPJ3GgA';

//get waether information
const getWeather = async (cityKey) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

//get city information
const getCity = async (cityName) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${cityName}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};