'use strict';

function getIconClass(icon) {
    switch (icon) {
        case '01d': return 'fa-solid fa-sun';
        case '01n': return 'fa-solid fa-moon';
        case '02d': return 'fa-solid fa-cloud-sun';
        case '02n': return 'fa-solid fa-cloud-moon';
        case '03d':
        case '03n': 
        case '04d':
        case '04n': return 'fa-solid fa-cloud';
        case '09d':
        case '09n': return 'fa-solid fa-cloud-showers-heavy';
        case '10d': return 'fa-solid fa-cloud-sun-rain';
        case '10n': return 'fa-solid fa-cloud-moon-rain';
        case '11d':
        case '11n': return 'fa-solid fa-cloud-bolt';
        case '13d':
        case '13n': return 'fa-regular fa-snowflake';
        case '50d':
        case '50n': return 'fa-solid fa-smog';
        default: return 'fa-solid fa-dice';
    };
}

function setIcon(icon) {
    $('#icon').removeClass();
    $('#icon').addClass(getIconClass(icon));
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
        let crd = pos.coords;
        console.log(crd);
        $.get({
            url: 'https://api.openweathermap.org/data/2.5/weather',
            data: {
                'lat': crd.latitude,
                'lon': crd.longitude,
                'appid': '534bdeee69ded9416f8de18456093176',
            },
            dataType: 'json',
        }).done(function(response) {
            let iconCode = response.weather[0].icon;
            setIcon(iconCode);
        }).fail(function(err) {
            setIcon('error');
        });
    }, function (err) {
        setIcon('error');
    });
});
