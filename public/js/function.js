const weatherApi = "/weather";

const divMain = document.querySelector(".main-content")
const weatherForm = document.querySelector(".weatherLocation");
const search = document.querySelector(".input-field");
const weatherIcon = document.querySelector(".weatherIcon i");
const temp = document.querySelector(".temperature span");
const weatherCondition = document.querySelector(".weatherCondition");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");
const windElement = document.querySelector(".wind");
const windIcon = document.querySelector(".wi_in");
const sunriseElement = document.querySelector(".sunrise");
const sunriseIcon = document.querySelector(".sn_in");

/*CONSTRUCTING DATE*/
const currentDate = new Date();
const dateOption = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", dateOption);
const actualDate = currentDate.getDate() + ", " + monthName;
dateElement.textContent = actualDate;

/*TO FETCH YOUR CURRENT LOCATION FROM BROWSER*/
if ("geolocation" in navigator) {
    locationElement.textContent = "Loading..."
    navigator.geolocation.getCurrentPosition(

        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiurl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

            fetch(apiurl)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.address && data.address.state_district) {
                        const dataCity = data.address.state_district;
                        showData(dataCity);
                    }

                    else {
                        console.log("City Not Found!!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    );
}

else {
    console.log("GeoLocation Not Found");
}

/*SEARCH BUTTON EVENT LISTNER*/
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    locationElement.textContent = "Loading...";
    weatherIcon.className = "";
    temp.textContent = "";
    weatherCondition.textContent = "";
    windElement.textContent = "";
    windIcon.className = "";
    sunriseElement.textContent = "";
    sunriseIcon.className = "";

    showData(search.value);
});

/*ASSIGNING VALUES FROM API TO UI*/
function showData(city) {

    getWeatherData(city, (result) => {

        if (result.cod == 200) {

            const currentTime = new Date();
            const hours = currentTime.getHours();

            if (hours <= 18) {

                divMain.style.background = "url('../images/bg_images/Day-Common.jpg')";
                divMain.style.backgroundRepeat = "no-repeat";
                divMain.style.backgroundSize = "cover";

                if (result.weather[0].main == "Clouds") {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                else if (result.weather[0].main == "Clear") {
                    weatherIcon.className = "wi wi-day-sunny"
                }
                else if (result.weather[0].main == "Rain") {
                    weatherIcon.className = "wi wi-day-rain"
                }
                else if (result.weather[0].main == "Thunderstorm") {
                    weatherIcon.className = "wi wi-day-thunderstorm"
                }
                else if (result.weather[0].main == "Drizzle") {
                    weatherIcon.className = "wi wi-day-sprinkle"
                }
                else if (result.weather[0].main == "Haze") {
                    weatherIcon.className = "wi wi-day-haze"
                }
                else if (result.weather[0].main == "Mist") {
                    weatherIcon.className = "wi wi-day-fog"
                }
                else if (result.weather[0].main == "Snow") {
                    weatherIcon.className = "wi wi-day-snow"
                }
                else if (result.weather[0].main == "Smoke") {
                    weatherIcon.className = "wi wi-smoke"
                }
                else {
                    weatherIcon.className = "wi wi-cloud";
                }

            }

            else if (hours >= 19) {

                divMain.style.background = "url('../images/bg_images/Night-Clear.jpg')";
                divMain.style.backgroundRepeat = "no-repeat";
                divMain.style.backgroundSize = "cover";

                if (result.weather[0].main == "Clouds") {
                    weatherIcon.className = "wi wi-night-alt-cloudy"
                }
                else if (result.weather[0].main == "Clear") {
                    weatherIcon.className = "wi wi-night-clear"
                }
                else if (result.weather[0].main == "Rain") {
                    weatherIcon.className = "wi wi-night-alt-rain"
                }
                else if (result.weather[0].main == "Drizzle") {
                    weatherIcon.className = "wi wi-night-alt-sprinkle"
                }
                else if (result.weather[0].main == "Thunderstorm") {
                    weatherIcon.className = "wi wi-night-alt-thunderstorm"
                }
                else if (result.weather[0].main == "Haze") {
                    weatherIcon.className = "wi wi-smog"
                }
                else if (result.weather[0].main == "Mist") {
                    weatherIcon.className = "wi wi-night-fog"
                }
                else if (result.weather[0].main == "Snow") {
                    weatherIcon.className = "wi wi-night-alt-snow"
                }
                else if (result.weather[0].main == "Smoke") {
                    weatherIcon.className = "wi wi-smoke"
                }
                else {
                    weatherIcon.className = "wi wi-cloud";
                }
            }

            else {
                console.log("Something Wrong Happened With Your Time Setting!!")
            }

            locationElement.textContent = result?.name;
            temp.textContent = (result?.main?.temp - 273.5).toFixed(2) +
                " " + String.fromCharCode(176) + "ᶜ";
            weatherCondition.textContent = result?.weather[0]?.description?.toUpperCase();
            windElement.textContent = result?.wind?.speed + " m/s";
            windIcon.className = "wi wi-strong-wind"
            sunriseElement.textContent = new Date(result?.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' am', ' AM').replace(' pm', ' PM');
            sunriseIcon.className = "wi wi-sunrise";

        }

        else {
            locationElement.textContent = "City Not Found"
        }

    });

}

/*FETCHING DATA FROM API CALL*/
function getWeatherData(city, callback) {
    const location = weatherApi + "?address=" + city;
    fetch(location).then((response) => {
        response.json().then((response) => {
            callback(response);
        });
    });
}

/*RESET BUTTON EVENT LISTNER*/
const resetButton = document.querySelector(".reset_button")
resetButton.addEventListener("click", (e) => {
    location.reload();
});