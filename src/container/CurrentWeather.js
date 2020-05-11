import React from "react";
import styled from "styled-components";
import { getIcon } from '../utils/helper';

const StyledContainer = styled.div`
  margin: 10px 0 0 25px;
  align-self: start;
  @media(min-width: 480px) {
    margin:  20px 0 0 55px;
  }
`;

const CurrentWeather = (props) => {
  const { data } = props;
  const weather = data.current.weather[0].main.toLowerCase();

  return (
    <StyledContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{ fontSize: "45px", fontWeight: "bold" }}
        >{`${data.current.temp}°C`}</div>{" "}
        &emsp;
        <img style={{ height: 55, width: 55 }} src={getIcon(weather).icon} />
      </div>
    </StyledContainer>
  );
};

export default CurrentWeather;
