import React, { Component } from "react";
import styled from "styled-components";
import { fetchWeather } from "../utils/api";
import ChartPage from "./ChartPage";
import { getTime } from "../utils/helper";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import WeatherCondition from "./WeatherCondition";
import DailyWeather from "./DailyWeather";
import SunTimings from "./SunTimingsChart";

const StyledMainContainer = styled.div`
  @media (max-width: 480px) {
    overflow: hidden;
  }
`;

const StyledChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  margin: 25px auto 25px auto;
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const StyledContainer = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  @media (min-width: 700px) {
    height: 40vh;
  }
`;

const StyledChart = styled.div`
  margin: 15px 15px 0 15px;
  position: relative;
  width: 80vw;
`;

class Home extends Component {
  state = {
    shouldSend: false,
    userCoords: null,
    weatherData: [],
    data: {
      labels: [],
      datasets: [
        {
          fill: false,
          lineTension: 0.3,
          backgroundColor: "white",
          borderColor: "rgb(0, 172, 230,1)",
          borderWidth: 2,
          data: [],
        },
      ],
    },
  };

  fetchWeatherDetails = async () => {
    const { userCoords } = this.state;
    const { lat, lng } = userCoords;
    const response = await fetchWeather(lat, lng);
    this.setState({ weatherData: response.data }, () => this.setData());
  };

  getHour = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let ss = getTime(date.getUTCHours() + 1);
    let result = date.getUTCHours() + 1;
    return ss;
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(this.onUserLocationSuccess);
    // this.setData();
  }

  onUserLocationSuccess = (pos) => {
    this.setState({ shouldSend: false });
    const { latitude, longitude } = pos.coords;
    const coOrds = { lat: latitude, lng: longitude };
    this.setState({ userCoords: coOrds, center: coOrds }, () => {
      this.fetchWeatherDetails();
    });
  };

  setData = () => {
    let data = this.state.data;
    let { weatherData, userCoords } = this.state;
    let hours = [];
    hours = weatherData.hourly.map((a) => this.getHour(a.dt));
    hours = hours.slice(0, 24);
    data.labels.push(...hours);
    for (let i = 0; i < data.labels.length; i++) {
      data.labels[i] = [data.labels[i]];
    }
    let temperature = weatherData.hourly.map((a) => a.temp).slice(0, 24);
    temperature = temperature.slice(0, 24);
    for (let i = 0; i < data.labels.length; i++) {
      data.labels[i].unshift(`${temperature[i]}°`);
    }
    data.datasets[0].data.push(...temperature);
    this.setState({ data, shouldSend: true });
  };

  getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(this.onUserLocationSuccess);
  };

  render() {
    const { data, userCoords, weatherData, shouldSend } = this.state;
    return (
      <div>
        {shouldSend && (
          <StyledMainContainer>
            <Search getUserLocation={this.getUserLocation} />
            <DailyWeather data={weatherData} />

            <StyledChartContainer>
              <CurrentWeather data={weatherData} />
              <StyledContainer>
                <StyledChart>
                  <ChartPage data={data} />
                </StyledChart>
              </StyledContainer>
              <WeatherCondition data={weatherData} />
              <SunTimings userCoords={userCoords}/>
            </StyledChartContainer>
          </StyledMainContainer>
        )}
      </div>
    );
  }
}

export default Home;