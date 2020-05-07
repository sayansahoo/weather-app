import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

class ChartPage extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.setState({ data: this.props.data });
  }


  render() {
    const { data } = this.state;
    return (
      <Line
        data={data}
        width={1000}
        height={150}
        options={{
          responsive: false,
          legend: { display: false },
          maintainAspectRatio: true,
          scales: {
            yAxes: [{ display: false, ticks: { stepSize: 6 } }],
            xAxes: [
              {
                ticks: {
                  maxTicksLimit: 30,
                  fontColor: "grey",
                },
              },
            ],
          },
        }}
      />
    );
  }
}

export default ChartPage;
