const city = document.getElementById("city");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const feel = document.getElementById("feel");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const iconElement = document.getElementById("icon");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// =============================

async function getWeather(cityName = "Cairo") {
    try {
        let response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=c3ca6e6206304ef6aca204836262607&q=${cityName}&aqi=no`
        );

        let data = await response.json();

        if (data.error) {
            alert("City Not Found");
            return;
        }

        displayWeather(data);

    } catch (error) {
        console.log(error);
    }
}



function displayWeather(data) {

    city.innerHTML = data.location.name;

    let today = new Date(data.location.localtime);

    date.innerHTML = today.toDateString();

    temp.innerHTML = `${data.current.temp_c}°C`;

    condition.innerHTML = data.current.condition.text;

    feel.innerHTML =
    `<i class="fa-solid fa-temperature-half"></i>
    Feels Like : ${data.current.feelslike_c}°C`;

    humidity.innerHTML =
    `<i class="fa-solid fa-droplet"></i>
    Humidity : ${data.current.humidity}%`;

    wind.innerHTML =
    `<i class="fa-solid fa-wind"></i>
    Wind : ${data.current.wind_kph} km/h`;

  
    updateIcon(data.current.condition.text, data.current.is_day);

    changeBackground(data.current.condition.text);

}


function updateIcon(weatherText, isDay) {
    const weather = weatherText.toLowerCase();
    iconElement.className = "fa-solid";

    if (weather.includes("clear") || weather.includes("sun")) {
        if (isDay) {
            iconElement.classList.add("fa-sun");
        } else {
            iconElement.classList.add("fa-moon");
        }
    } else if (weather.includes("cloud") || weather.includes("overcast") || weather.includes("mist")) {
        if (isDay) {
            iconElement.classList.add("fa-cloud-sun");
        } else {
            iconElement.classList.add("fa-cloud-moon");
        }
    } else if (weather.includes("rain") || weather.includes("drizzle")) {
        iconElement.classList.add("fa-cloud-showers-heavy");
    } else if (weather.includes("thunder") || weather.includes("storm")) {
        iconElement.classList.add("fa-cloud-bolt");
    } else if (weather.includes("snow") || weather.includes("ice")) {
        iconElement.classList.add("fa-snowflake");
    } else {
        iconElement.classList.add("fa-cloud");
    }
}



function changeBackground(weather){

    weather = weather.toLowerCase();

    if(weather.includes("sun") || weather.includes("clear")){
        document.body.style.background =
        "linear-gradient(135deg,#4facfe,#00f2fe)";
    }
    else if(weather.includes("cloud")){
        document.body.style.background =
        "linear-gradient(135deg,#757F9A,#D7DDE8)";
    }
    else if(weather.includes("rain")){
        document.body.style.background =
        "linear-gradient(135deg,#2C3E50,#4CA1AF)";
    }
    else if(weather.includes("snow")){
        document.body.style.background =
        "linear-gradient(135deg,#83a4d4,#b6fbff)";
    }
    else{
        document.body.style.background =
        "linear-gradient(135deg,#0F2027,#203A43,#2C5364)";
    }

}



searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    if(searchInput.value.trim() != ""){
        getWeather(searchInput.value);
    }
});


searchInput.addEventListener("keyup", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        if(searchInput.value.trim() != ""){
            getWeather(searchInput.value);
        }
    }
});

function changeBackground(weather){
    weather = weather.toLowerCase();

    if(weather.includes("sun") || weather.includes("clear")){
      
        document.body.style.background = 
        "linear-gradient(135deg, #0f172a, #1e3a8a, #0f172a)";
    }
    else if(weather.includes("cloud") || weather.includes("overcast") || weather.includes("mist")){
       
        document.body.style.background = 
        "linear-gradient(135deg, #111827, #374151, #111827)";
    }
    else if(weather.includes("rain") || weather.includes("drizzle")){
        
        document.body.style.background = 
        "linear-gradient(135deg, #0f172a, #1e293b, #0f2027)";
    }
    else if(weather.includes("snow") || weather.includes("ice")){

        document.body.style.background = 
        "linear-gradient(135deg, #0f172a, #334155, #1e293b)";
    }
    else{
      
        document.body.style.background = 
        "linear-gradient(135deg, #0b0f19, #111827, #0b0f19)";
    }
}



getWeather();
