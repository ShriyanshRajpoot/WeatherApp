const inp = document.querySelector("input");
const btn = document.querySelector("button");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const apiKey = "9f6290d6cda9a36a63755fadee71f83d";

btn.addEventListener("click", () => {

    const cityName = inp.value.trim();

    if(cityName===""){
        alert("Enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(res=>res.json())
    .then(data=>{

        city.innerText=data.name;
        temp.innerText=Math.round(data.main.temp)+"°C";
        desc.innerText=data.weather[0].description;

        humidity.innerText=data.main.humidity+"%";
        wind.innerText=data.wind.speed+" km/h";

        icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        feelsLike.innerText = Math.round(data.main.feels_like) + "°C";

        pressure.innerText = data.main.pressure + " hPa";

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

        });

});
