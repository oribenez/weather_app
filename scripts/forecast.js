class Forecast{
    constructor(){
        this.key = 'ATqPU34AF37RpEgvox5QoAmwwaPJ3GgA';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return { cityDets, weather };
    }
    
    async getCity(cityName){
        const query = `?apikey=${this.key}&q=${cityName}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(cityId){
        const query = `${cityId}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}