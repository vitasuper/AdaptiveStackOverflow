import React, { Component } from 'react';
import { Calendar } from '@nivo/calendar';

class MyCalendar extends Component {
  render() {
    return (
      <Calendar
        width={900}
        height={200}
        margin={{
          top: 50,
          right: 10,
          bottom: 10,
          left: 50
        }}
        from="2018-01-01T07:00:00.000Z"
        to="2019-12-30T07:00:00.000Z"
        data={this.props.data}
      />
    );
  }
}

export default MyCalendar;
