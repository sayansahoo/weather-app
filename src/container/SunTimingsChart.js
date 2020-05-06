import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import * as sampleData from "../utils/sample.json";
import styled from "styled-components";
import { getTime } from "../utils/helper";
import moment from "moment";
import { fetchWeather } from "../utils/api";

const StyledContainer = styled.div`
  margin: 45px 25px 0 25px;
`;

const StyledChart = styled.div`
  width: 79vw;
  @media (max-width: 480px) {
    margin: 35px 25px 10px 25px;
  }
`;
class SunTimings extends Component {
  state = {
    shouldShow: false,
    weatherData: [],
    data: {
      labels: ["6am", "12pm", "8pm"],
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

  componentDidMount() {
    this.fetchWeatherDetails();
  }

  fetchWeatherDetails = async () => {
    this.setState({ shouldShow: false });
    const { lat, lng } = this.props.userCoords;
    const response = await fetchWeather(lat, lng);
    this.setState({ weatherData: response.data }, () => {
      this.setData();
    });
  };

  getHour = (timestamp) => {
    let date = new Date(timestamp * 1000);
    var dateUTC = moment.utc(date, "YYYY-MM-DD HH");
    var local = dateUTC.local().format("h:mm");
    return local;
  };

  setData = () => {
    let data = this.state.data;
    const { weatherData } = this.state;
    const sunriseUnix = weatherData.current.sunrise;
    const sunsetUnix = weatherData.current.sunset;
    let sunrise = parseFloat(this.getHour(sunriseUnix));
    let sunset = parseFloat(this.getHour(sunsetUnix));
    this.setState({ sunrise, sunset });
    data.datasets[0].data.push(sunrise, 12, sunset);

    let timeNow = moment().format("h:mm");

    this.setState({ data: data, shouldShow: true });
  };

  render() {
    const { shouldShow, data, sunrise, sunset } = this.state;
    return (
      <StyledContainer>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ flexDirection: "column", display: "flex" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              Sunrise
            </span>
            <span>{`${sunrise} AM`}</span>
          </div>
          <div style={{ flexDirection: "column", display: "flex" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>Sunset</span>
            <span>{`${sunset} PM`}</span>
          </div>
        </div>
        {shouldShow && (
          <StyledChart>
            <Line
              width={1000}
              height={100}
              data={data}
              options={{
                responsive: true,
                legend: { display: false },
                maintainAspectRatio: false,
                scales: {
                  yAxes: [{ display: false }],
                },
              }}
            />
          </StyledChart>
        )}
      </StyledContainer>
    );
  }
}

export default SunTimings;
