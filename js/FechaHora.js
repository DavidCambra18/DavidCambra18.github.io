function updateClock() {
    const now = new Date();
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const dayIndex = (now.getDay() + 6) % 7;
    const dayName = days[dayIndex];

    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    document.getElementById("clock").innerHTML = `
        🕒 ${hours}:${minutes}:${seconds} <br>
        📅 ${dayName}, ${day} de ${month} de ${year}
    `;
}

setInterval(updateClock, 1000);
updateClock();