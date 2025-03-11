async function searchWeather() {
    const apiKey = 'ccc8e221ad61bf019f5dd3504a4f5900'; // Coloca aquí tu clave de OpenWeatherMap
    const city = document.getElementById("city-input").value.trim();

    if (city === "") {
        document.getElementById("manual-weather-info").innerText = "❌ Ingresa una ciudad.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Ciudad no encontrada");
        }
        const data = await response.json();
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        document.getElementById("manual-weather-info").innerText = `🌡 ${temp}°C - ${desc}`;
    } catch (error) {
        document.getElementById("manual-weather-info").innerText = "❌ No se encontró la ciudad.";
    }
}