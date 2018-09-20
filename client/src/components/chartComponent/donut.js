import React, { Component } from 'react';
import { Pie } from '@nivo/pie';

class MyDonut extends Component {
  render() {
    return (
      <Pie
        width={600}
        height={400}
        colors="set2"
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40
        }}
        data={this.props.data}
        animate
        innerRadius={0.6}
      />

    );
  }
}

export default MyDonut;
