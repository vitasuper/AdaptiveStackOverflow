import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';

class MyWordCloud extends Component {

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 30;
    const rotate = word => (word.value * Math.floor(Math.random() * 360)) % 45;
    return (
      <WordCloud
        width={600}
        height={300}
        data={this.props.data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        font={'Roboto'}
      />
    );
  }
}

export default MyWordCloud;
