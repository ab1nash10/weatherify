/* These lines of code are declaring and initializing variables using the `const` keyword. Each
variable is assigned a reference to a specific HTML element on the webpage using the `querySelector`
method. */
const apiKey = "124f56f7736f5662c56a82975872ed64";
const form = document.querySelector("form");
const weather = document.querySelector(".weather");
const search = document.querySelector("#searchbox");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".windtxt");
const humidity = document.querySelector(".humiditytxt");
const visibility = document.querySelector(".visibilitytxt");
const feelsLike = document.querySelector(".feelsLike");
const icon = document.querySelector(".imgWeather");
/**
 * The `getWeather` function fetches weather data from the OpenWeatherMap API for a given city and
 * displays the weather description, icon, and other information on a webpage.
 * @param cityName - The `cityName` parameter is a string that represents the name of the city for
 * which you want to retrieve the weather information.
 */
const getWeather = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const weatherDes = data.weather;
  weatherDes.forEach((element) => {
    feelsLike.innerHTML = element.description;
    path = element.icon;
    icon.innerHTML = `
    <img src="../../assets/images/weather_icons/${path}.png" alt="" class="h-10" />`;
  });
  showWeather(data);
  console.log(data);
  const date = new Date();
  city.innerHTML = `
  <h1 class="cityName">${data.name}</h1>
  <h2 class="date h-auto w-full rounded-md p-2">${date.toDateString()}</h2>
  `;
};

/**
 * The function `showWeather` updates the HTML elements with weather data and removes the "hidden"
 * class to display the elements.
 * @param data - The `data` parameter is an object that contains weather information. It is expected to
 * have the following properties:
 */
const showWeather = (data) => {
  search.value = "";
  temp.classList.remove("hidden");
  temp.textContent = data.main.temp;
  wind.classList.remove("hidden");
  wind.textContent = data.wind.speed;
  humidity.classList.remove("hidden");
  humidity.textContent = data.main.humidity + "%";
  visibility.classList.remove("hidden");
  visibility.textContent = data.visibility / 1000 + "Km/h";
  feelsLike.classList.remove("hidden");
};
form.addEventListener("submit", (e) => {
  getWeather(search.value);
  e.preventDefault();
});
