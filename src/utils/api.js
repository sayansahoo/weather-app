const API_KEY = "68078fb5c09f9f1e03cd32e0c5ed7092";
const axios = require("axios");

export const fetchWeather = async (lat = 19.076, lon = 72.8777) => {
  let response = "";
  try {
    response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response;
};

export const fetchCityWeather = async (city = "Mumbai") => {
  let response = "";
  try {
    response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${API_KEY}`
    );
  } catch (error) {
    console.error(error);
  }
  return response;
};

export const fetchPlaces = async (place) => {
  let response = "";
  try {
    response = await axios.get(`http://localhost:5000/?place=${place}`);
  } catch (error) {
    console.error(error);
  }
  return response;
};
