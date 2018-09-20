import React, { Component } from 'react';
import { Line } from '@nivo/line';


class MyLine extends Component {
  render() {
    return (
      <Line
        width={900}
        height={400}
        margin={{
          top: 20,
          right: 60,
          bottom: 60,
          left: 60
        }}
        data={this.props.data}
        animate
      />
    );
  }
}

export default MyLine;






