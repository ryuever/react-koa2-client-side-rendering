import React, { Component } from 'react';
import moment from 'moment';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const localWeekdays = moment.weekdays();
    const currentWeekday = localWeekdays[moment().weekday()];
    return (
      <div>
        <span>Hello, If you like, please star on this project.</span>
        <span>{`Today is ${currentWeekday}`}</span>
      </div>
    );
  }
}
