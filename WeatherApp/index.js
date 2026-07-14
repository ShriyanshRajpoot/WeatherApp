const inp = document.querySelector("input");
const btn = document.querySelector("button");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const maxTemp = document.getElementById("maxTemp");
const country = document.getElementById("country");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const apiKey = "Your API Key";

document.body.classList.add("default");

function changeBackground(weather) {
    const weatherClasses = [
        "default",
        "clear",
        "clouds",
        "rain",
        "thunderstorm",
        "snow",
        "mist"
    ];

    document.body.classList.remove(...weatherClasses);

    switch (weather.toLowerCase()) {
        case "clear":
            document.body.classList.add("clear");
            break;

        case "clouds":
            document.body.classList.add("clouds");
            break;

        case "rain":
        case "drizzle":
            document.body.classList.add("rain");
            break;

        case "thunderstorm":
            document.body.classList.add("thunderstorm");
            break;

        case "snow":
            document.body.classList.add("snow");
            break;

        case "mist":
        case "fog":
        case "haze":
        case "smoke":
            document.body.classList.add("mist");
            break;

        default:
            document.body.classList.add("default");
    }
}

btn.addEventListener("click", () => {

    const cityName = inp.value.trim();

    if (cityName === "") {
        alert("Enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {

            if (data.cod != 200) {
                alert("City not found!");
                return;
            }

            city.innerText = data.name;
            country.innerText = data.sys.country;
            temp.innerText = Math.round(data.main.temp) + "°C";
            desc.innerText = data.weather[0].description;

            humidity.innerText = data.main.humidity + "%";
            wind.innerText = data.wind.speed + " km/h";

            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            icon.style.display = "block";

            feelsLike.innerText = Math.round(data.main.feels_like) + "°C";
            maxTemp.innerText = Math.round(data.main.temp_max) + "°C";

            if (pressure) {
                pressure.innerText = data.main.pressure + " hPa";
            }

            visibility.innerText = (data.visibility / 1000).toFixed(1) + " km";

            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const sunsetTime = new Date(data.sys.sunset * 1000);

            sunrise.innerText = sunriseTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            sunset.innerText = sunsetTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            changeBackground(data.weather[0].main);
        })
        .catch(() => {
            alert("Something went wrong. Please try again.");
        });

});
inp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});
