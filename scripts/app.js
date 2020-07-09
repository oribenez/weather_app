const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUi = (data) => {
    //destructure properties
    const { cityDets, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update night/day images & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //show the weather card
    card.classList.remove('d-none');
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    if (city !== '') {
        //save city to local stoarge
        localStorage.setItem('city', city);

        //update the UI with new city
        updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));
    }
});

//show weather for the last city entered last time
const localStorage_city = localStorage.getItem('city');
if (localStorage_city) {
    //update the UI with new city
    updateCity(localStorage_city)
    .then(data => updateUi(data))
    .catch(err => console.log(err));
}