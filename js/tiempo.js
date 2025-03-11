async function getWeather(lat, lon) {
    const apiKey = 'ccc8e221ad61bf019f5dd3504a4f5900';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Obtener datos
        const cityName = data.name; // Nombre de la ciudad detectada
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const weatherIcon = data.weather[0].icon; // Código del icono de OpenWeatherMap

        // Convertir el icono de OpenWeatherMap a Font Awesome
        let iconClass = getWeatherIcon(weatherIcon);

        // Mostrar la ciudad, temperatura y el icono
        document.getElementById("weather-info").innerHTML = `
            📍 ${cityName} | <i class="${iconClass}"></i> 🌡 ${temp}°C - ${desc}
        `;
    } catch (error) {
        document.getElementById("weather-info").innerText = "❌ Error al obtener el clima.";
    }
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        "01d": "fas fa-sun",              // Soleado (día)
        "01n": "fas fa-moon",             // Despejado (noche)
        "02d": "fas fa-cloud-sun",        // Parcialmente nublado (día)
        "02n": "fas fa-cloud-moon",       // Parcialmente nublado (noche)
        "03d": "fas fa-cloud",            // Nublado
        "03n": "fas fa-cloud",            // Nublado (noche)
        "04d": "fas fa-cloud-meatball",   // Muy nublado
        "04n": "fas fa-cloud-meatball",   // Muy nublado (noche)
        "09d": "fas fa-cloud-showers-heavy", // Lluvia ligera
        "09n": "fas fa-cloud-showers-heavy", // Lluvia ligera (noche)
        "10d": "fas fa-cloud-rain",       // Lluvia moderada
        "10n": "fas fa-cloud-rain",       // Lluvia moderada (noche)
        "11d": "fas fa-bolt",             // Tormenta eléctrica
        "11n": "fas fa-bolt",             // Tormenta eléctrica (noche)
        "13d": "fas fa-snowflake",        // Nieve
        "13n": "fas fa-snowflake",        // Nieve (noche)
        "50d": "fas fa-smog",             // Niebla
        "50n": "fas fa-smog"              // Niebla (noche)
    };

    return iconMap[iconCode] || "fas fa-question-circle"; // Icono predeterminado si no se encuentra
}

function handleLocationError(error) {
    let message;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "❌ Acceso a la ubicación denegado.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "❌ Ubicación no disponible.";
            break;
        case error.TIMEOUT:
            message = "❌ Tiempo de espera agotado.";
            break;
        case error.UNKNOWN_ERROR:
            message = "❌ Error desconocido.";
            break;
    }
    document.getElementById("weather-info").innerText = message;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeather(lat, lon);
            },
            (error) => {
                handleLocationError(error);
            }
        );
    } else {
        document.getElementById("weather-info").innerText = "❌ Tu navegador no soporta geolocalización.";
    }
}

// Ejecutar la función al cargar la página
getLocation();
