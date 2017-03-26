function getIconClass(icon) {
    switch (icon) {
        case '01d': 
        case '02d': 
        case '03d': return 'fa fa-sun-o';
        case '01n': 
        case '02n': 
        case '03n': return 'fa fa-moon-o';
        case '04d': 
        case '04n':
        case '50d': 
        case '50n': return 'fa fa-cloud';
        case '09d':
        case '09n':
        case '10d':
        case '10n': return 'fa fa-tint';
        case '11d':
        case '11n': return 'fa fa-bolt';
        case '13d':
        case '13n': return 'fa fa-snowflake-o';
        default: return 'fa fa-frown-o';
    };
}

function setIcon(icon) {
    $('#icon').removeClass();
    $('#icon').addClass(getIconClass(icon));
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
        var crd = pos.coords;

        $.get({
            url: 'https://vali.li/data/2.5/weather',
            data: {
                'lat': crd.latitude,
                'lon': crd.longitude
            },
            dataType: 'json'
        }).done(function(response) {
            var iconCode = response.weather[0].icon;
            setIcon(iconCode);
        }).fail(function(err) {
            setIcon('error');
        });
    }, function (err) {
        setIcon('error');
    });
});
