import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

const StyledBox = styled.div`
  background: rgb(230, 255, 255);
  min-width: 120px;
  text-align: center;
  padding: 10px 0 10px 0;
  @media (min-width: 700px) {
    width: 300px;
    height: 90px;
  }
`;

const StyledSpan = styled.div`
  font-weight: bold;
  font-size: 13px;
  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

const StyledWeather = styled.span`
  font-weight: bold;
  font-size: 13px;
`;

const WeatherCondition = (props) => {
  const { pressure, humidity } = props.data.current;
  return (
    <StyledContainer>
      <StyledBox>
        <StyledSpan>Pressure</StyledSpan>
        <StyledWeather>{`${pressure} hpa`}</StyledWeather>
      </StyledBox>
      <StyledBox>
        <StyledSpan>Humidity</StyledSpan>
        <StyledWeather>{`${humidity}%`}</StyledWeather>
      </StyledBox>
    </StyledContainer>
  );
};

export default WeatherCondition;
