import React from "react";
import styled from "styled-components";
import { getIcon } from '../utils/helper';

const StyledContainer = styled.div`
  margin: 20px 0 0 15px;
  align-self: start;
`;

const CurrentWeather = (props) => {
  const { data } = props;
  const weather = data.current.weather[0].main.toLowerCase();

  return (
    <StyledContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{ fontSize: "55px", fontWeight: "bold" }}
        >{`${data.current.temp}°C`}</div>{" "}
        &emsp;
        <img style={{ height: 60, width: 60 }} src={getIcon(weather).icon} />
      </div>
    </StyledContainer>
  );
};

export default CurrentWeather;
