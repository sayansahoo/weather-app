import React from "react";
import styled from "styled-components";
import { getDay, getIcon } from "../utils/helper";

const StyledContainer = styled.div`
  display: flex;
  margin: 25px auto 25px auto;
  justify-content: space-around;
  position: relative;
  width: 80vw;
  @media (max-width: 480px) {
    overflow-x: scroll;
  }
`;

const StyledSecondContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
`;

const StyledList = styled.div`
  min-width: 100px;
  min-height: 40px;
  scroll: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const StyledSpanMax = styled.span`
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StyledSpanMin = styled.span`
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StyledImage = styled.img`
  height: 20px;
  width: 20px;
  align-self: center;
`;

const DailyWeather = (props) => {
  let days = props.data.daily.slice(0, 7);

  return (
    <StyledContainer>
      <StyledSecondContainer>
        {days.map((day, idx) => {
          return (
            <StyledList key={idx}>
              <div style={{ fontWeight: "bold" }}>{getDay(day.dt)}</div>
              <div>
                <StyledSpanMax>{`${day.temp.max}°`}</StyledSpanMax>&nbsp;
                <StyledSpanMin>{`${day.temp.min}°`}</StyledSpanMin>
              </div>
              <StyledImage src={getIcon(day.weather[0].main).icon} />
              <div>{getIcon(day.weather[0].main).weatherCondition}</div>
            </StyledList>
          );
        })}
      </StyledSecondContainer>
    </StyledContainer>
  );
};
export default DailyWeather;
