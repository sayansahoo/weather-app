import React, { Component } from "react";
import styled from "styled-components";
import { fetchPlaces } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { fetchCityWeather } from "../utils/api";
import { getIcon } from "../utils/helper";

const StyledContainer = styled.div`
  margin-top: 15px;
`;

const StyledSearchContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px 15px 5px 15px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
`;

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 10px;
  border: none;
  outline: green;
  margin-left: 10px;
  @media (min-width: 700px) {
    margin-left: 20px;
  }
`;

const StyledDropdown = styled.div`
  width: 90%;
  margin: 2px auto 20px auto;
  z-index: 9;
  position: absolute;
  background: white;
  left: 0;
  right: 0;
  border-radius: 10px;
  // border: ${props=>!props.isClicked && '0.6px solid grey'};
  padding: 10px 0 10px 0;
  box-shadow: ${props=> !props.isClicked && '1px 1px 10px rgba(0, 0, 0, 0.3)'};
`;

const StyledList = styled.div`
  border-bottom: 0.1px solid grey;
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  box-size: border-box;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &: last-child {
    border-bottom: none;
  }
`;


const StyledImage = styled.img`
  height: 30px;
  width: 30px;
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const StyledTemp = styled.div`
  @media (max-width: 480px) {
    font-weight: bold;
  }
`;

class SampleSearch extends Component {
  state = {
    isClicked: false,
    searchTerm: "",
    suggestions: [],
  };

  fetchPlaceDetails = async (searchTerm) => {
    let response = await fetchPlaces(searchTerm);
    response = response.data.predictions;
    this.renderData(response);
  };

  onEnterSearch = (e) => {
    this.setState({ searchTerm: e.target.value, isClicked: false }, () => {
      this.fetchPlaceDetails(this.state.searchTerm);
    });
  };

  getCityWeather = async (city) => {
    const response = await fetchCityWeather(city);
    if (response) {
      return {
        weatherCondition: response.data.weather[0].main,
        temp: `${response.data.main.temp}°C`,
      };
    } else {
      return {
        weatherCondition: "not found",
        temp: "NIL",
      };
    }
  };

  renderData = async (suggestions) => {
    let newArr = [];
    for (let i = 0; i < suggestions.length; i++) {
      const city = suggestions[i].structured_formatting.main_text;
      const res = await this.getCityWeather(city);
      let primText = suggestions[i].structured_formatting.main_text;
      let secText = suggestions[i].structured_formatting.secondary_text;
      newArr.push({
        mainText: primText,
        secondaryText: secText && secText.split(",").slice(0, 1),
        weatherCondition: res.weatherCondition,
        temp: res.temp,
      });
    }
    this.setState({ suggestions: newArr });
  };

  onClickSearchTerm = (city) => {
    this.props.fetchCoordinates(city);
    this.setState({ isClicked: true, searchTerm: city });
  };

  render() {
    let { searchTerm, suggestions, isClicked } = this.state;
    const { getUserLocation } = this.props;
    suggestions = suggestions.slice(0,2);
    return (
      <StyledContainer>
        <StyledSearchContainer>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="lg"
            onClick={getUserLocation}
          />
          <StyledInput
            placeholder="Search Places ..."
            value={searchTerm}
            onChange={(e) => this.onEnterSearch(e)}
          />
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </StyledSearchContainer>
        {suggestions.length>0 && searchTerm.length > 0 && (
          <StyledDropdown isClicked={suggestions.length> 0 && isClicked}>
            {searchTerm.length > 0 &&
              !isClicked &&
              suggestions.map((a, idx) => {
                return (
                  <StyledList
                    key={idx}
                    onClick={() => this.onClickSearchTerm(a.mainText)}
                  >
                    <div>
                      <span>
                        <strong>{a.mainText}</strong>,{" "}
                      </span>
                      <span>{a.secondaryText}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StyledTemp>{a.temp}</StyledTemp> &nbsp; &nbsp;
                      <StyledImage src={getIcon(a.weatherCondition).icon} />
                    </div>
                  </StyledList>
                );
              })}
          </StyledDropdown>
        )}
      </StyledContainer>
    );
  }
}

export default SampleSearch;
