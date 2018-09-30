import React, { Component } from 'react';
import MyCalendar from './chartComponent/calendar';
import MyDonut from './chartComponent/donut';
import MyWordCloud from './chartComponent/wordCloud';
import MyLine from './chartComponent/line';

import axios from 'axios';


class Vis extends Component {
  constructor(props) {
    super(props);

    console.log("client/src/components/vis.js - this.props: ")
    console.log(props)

    this.state = {
      username: props.getUsername(),
      calendarData: [
        {day: '2018-02-07',value: 222},
        {day: '2018-08-27',value: 251},
        {day: '2018-09-11',value: 187},
        {day: '2018-01-23',value: 287},
        {day: '2018-02-11',value: 161},
        {day: '2018-09-01',value: 327},
      ],
      donutDataDaily: [
        {
          "id": "Morning",
          "label": "Morning",
          "value": 15,
        },
        {
          "id": "Afternoon",
          "label": "Afternoon",
          "value": 219,
        },
        {
          "id": "Evening",
          "label": "Evening",
          "value": 184,
        }
      ],
      donutDataWeekly: [
        {
          "id": "Monday",
          "label": "Monday",
          "value": 0,
        },
        {
          "id": "Tuesday",
          "label": "Tuesday",
          "value": 0,
        },
        {
          "id": "Wednesday",
          "label": "Wednesday",
          "value": 0,
        },
        {
          "id": "Thursday",
          "label": "Thursday",
          "value": 4,
        },
        {
          "id": "Friday",
          "label": "Friday",
          "value": 5,
        },
        {
          "id": "Saturday",
          "label": "Saturday",
          "value": 12,
        },
        {
          "id": "Sunday",
          "label": "Sunday",
          "value": 23,
        },
      ],
      wordCloudData: [
        { text: 'Hey', value: 1000 },
        { text: 'lol', value: 200 },
        { text: 'first impression', value: 800 },
        { text: 'very cool', value: 1000000 },
        { text: 'duck', value: 10 },
      ],
      lineData: [
        {
          id: 'whisky',
          data: [
            {x: '2018-9-12',y: 146},
            {x: '2018-9-14',y: 31},
            {x: '2018-9-16',y: 11},
          ]
        },
        {
          id: 'rhum',
          data: [
            {x: '2018-9-12',y: 38},
            {x: '2018-9-14',y: 58},
            {x: '2018-9-16',y: 0},
          ]
        },
      ]
    };

    this.calcWeeklyMajor = this.calcWeeklyMajor.bind(this);
    this.calcDailyMajor = this.calcDailyMajor.bind(this);
    this.calcAverageStayTime = this.calcAverageStayTime.bind(this);
  }

  componentDidMount() {
    console.log("=========VIS-COMPONENTDIDMOUNT-Username: " + this.state.username);
    axios
      .get('/userevent/' + this.state.username + '/types')
      .then((response) => {
          this.setState({
            wordCloudData: response.data.wordCloudData,
            calendarData: response.data.calendarData,
            loginCnt: response.data.loginCnt,
            donutDataDaily: response.data.dailyData,
            donutDataWeekly: response.data.weeklyData,
            lineData: response.data.lineData,
            averageStayTime: response.data.averageStayTime,
          })
          console.log(response.data);
      }).catch((error) => {
          console.log('save error');
      });
  }

  calcWeeklyMajor() {
    let weekdayCnt = 0, weekendCnt = 0;
    let weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let weekend = ['Saturday', 'Sunday'];

    for (var i = 0; i < this.state.donutDataWeekly.length; ++i) {
      if (weekday.indexOf(this.state.donutDataWeekly[i]['id']) != -1) {
        weekdayCnt += this.state.donutDataWeekly[i]['value'];
      } else if (weekend.indexOf(this.state.donutDataWeekly[i]['id']) != -1) {
        weekendCnt += this.state.donutDataWeekly[i]['value'];
      }
    }

    return (weekdayCnt >= weekendCnt ? "weekdays" : "weekend");
  }

  calcDailyMajor() {
    let morningCnt = 0, afternoonCnt = 0, eveningCnt = 0;
    for (var i = 0; i < this.state.donutDataDaily.length; ++i) {
      if (this.state.donutDataDaily[i]['id'] === 'Morning') {
        morningCnt += this.state.donutDataDaily[i]['value'];
      } else if (this.state.donutDataDaily[i]['id'] === 'Afternoon') {
        afternoonCnt += this.state.donutDataDaily[i]['value'];
      } else {
        eveningCnt += this.state.donutDataDaily[i]['value'];
      }
    }

    if (morningCnt >= afternoonCnt && morningCnt >= eveningCnt) {
      return "in the morning";
    } else if (afternoonCnt >= morningCnt && afternoonCnt >= eveningCnt) {
      return "in the afternoon";
    } else {
      return "at night";
    }
  }

  calcAverageStayTime() {
    let time = Math.floor(parseFloat(this.state.averageStayTime));
    if (time <= 60) {
      return time + ' s';
    } else {
      return (Math.round(time * 10 / 60) / 10) + ' min';
    }
  }

  render() {
    const weeklyMajor = this.calcWeeklyMajor();
    const dailyMajor = this.calcDailyMajor();
    const stayTime = this.calcAverageStayTime();

    return (
      <div>
        <div className="intro-text col-6 col-mx-auto">
          Hi {this.state.username}, in 2018-2019 you visited StackOverflow for <span>{this.state.loginCnt}</span> times. The calendar showing your visit times for each day is as follows:
        </div>
        <div className="intro-text-minor col-6 col-mx-auto">
          Your average stay time is <span>{stayTime}</span>. Thanks for staying with us!
        </div>
        <div className="col-4 col-mx-auto chart">
          <MyCalendar data={this.state.calendarData} />
        </div>

        <div className="intro-text col-6 col-mx-auto">
          It seems that you prefer to visit our site {dailyMajor} and on {weeklyMajor}.
        </div>
        <div className="columns" id="donut-row"> 
          <div className="column col-6 chart">
            <MyDonut data={this.state.donutDataDaily} />
          </div>
          {/* <div className="column col-2 col-mr-auto visit-average-time-text">
            <div className="visit-average-time-text-inner">
              The average time you spent on every visit is <span>300s</span>.
            </div>
          </div> */}
          <div className="column col-6 chart">
            <MyDonut data={this.state.donutDataWeekly} />
          </div>
        </div>

        <div className="intro-text col-6 col-mx-auto">
          Here is a weekly chart indicating how many times you click the question title and the bookmark-question button.
        </div>
        <div className="col-8 col-mx-auto chart">
          <MyLine data={this.state.lineData} />
        </div>

        <div className="intro-text col-6 col-mx-auto">
          The following word cloud is extracting from the words you've highlighted, and you might want to have a review :)
        </div>
        <div className="col-8 col-mx-auto chart">
          <MyWordCloud data={this.state.wordCloudData} />
        </div>

        <hr/>

        <div className="footnote col-10 col-mx-auto">
          {`Here are the user behaviors that we log, and the reason why we decide to log these actions`}:
          <ul>
            <li><b>User login/visit:</b> we log the exact login or visit timestamps of the user, to further calculate how many times the user have visited our site, and what time in a day and in a week the user prefers to visit the our site.</li>
            <li><b>User stay time:</b> we will log the time period from the user open our website to the user logout or close the tab/browser. By doing this we can figure out the average time the user will like to stay with us.</li>
            <li><b>Question title click:</b> everytime the user click the title of the questions, we will record the corresponding timestamp. This behavior shows the user's tendency to see the answers list after he/she views the overview of the questions.</li>
            <li><b>Question bookmark:</b> everytime the user bookmark a specific question, we will record the info of the question (title, etc.) and the timestamp. The bookmark behavior indicates that the user is interested in the question and the info can be referenced in the future.</li>
            <li><b>Keyword highlighted:</b> we will record the user selecting the words (highlighting the words) in the excerpt of the questions. The words user selecting/highlighting are meaningful as the user tends to select the words while they want to search for details of the word or he/she is trying to stay focus.</li>
          </ul>
        </div>

        <div className="footnote col-10 col-mx-auto">
          {`Analysis & Findings`}:
          <ul>
            <li><b>Calendar chart:</b> shows users' login/visit frequency and average stay time.
              <ul>
                <li>If the calendar chart has few time slots filled and the average stay time is low, it means current user seldom use our site. </li>
                <li>If the calendar chart has few time slots filled but the average stay time is high, it means current user seldom visit our site but will spend a long time everytime he/she visits. He/she may come to our site to find a solution for a question and use our site only when needed. </li>
                <li>If the calendar chart has many time slots filled but the average stay time is low, it means current user gets used to visit our site frequently. He/she will browse quickly and get some knowledge from our site.</li>
                <li>If the calendar chart has many time slots filled and the average stay time is high, it means current user gets used to visit our site frequently and may browse the info for a long time, or he/she may contribute their own answers to our site. <span>[see user aaa]</span></li>
              </ul>
            </li>
          </ul>
          
          <ul>
            <li><b>Pie chart 1:</b> shows what time in a day the user visits our site most (cycle behavior)
              <ul>
                <li>We can figure out if user like to visit our site in the morning/afternoon/evening. This will be a helpful info for our site to decide when to push something like "daily overview" to the user.</li>
              </ul>
            </li>
          </ul>

          <ul>
            <li><b>Pie chart 2:</b> shows what time in a week the user visits our site most (cycle behavior)
              <ul>
                <li>We can figure out if user like to visit our site on weekday <span>[see user bbb]</span> or on weekend <span>[see user ccc]</span>. We can understand more about users' habit and will be a helpful info for our site to decide when to do some weekly events.</li>
              </ul>
            </li>
          </ul>

          <ul>
            <li><b>Line chart:</b> shows how many times a user click the question title and bookmark a question in a week
              <ul>
                <li>If the user clicks the question titles for many times, he/she may tend to see the solutions for the questions.</li>
                <li>If the user like to bookmark the question, he/she may want to save the question for future reference. Maybe we should consider repop the question to the dashboard sometimes.</li>
                <li>If the user seldom click the question titles or seldom bookmark the question, he/she may just want to get a brief view and the trend of the Java related topic.</li>
              </ul>
            </li>
          </ul>

          <ul>
            <li><b>Word cloud chart:</b> shows words users may be interested in extracted from words the user selecting / highlighting
              <ul>
                <li>If there are so many words in the word cloud, the user likes to highlighted the word in the excerpt, and maybe we should push more questions related to these words and topics.</li>
                <li>If there are few words in the word cloud, the user seldom highlighted the words in excerpt. Maybe our site should do something to let the user know they can highlight the word to get more questions they may be interested in.</li>
              </ul>
            </li>
          </ul>

        </div>

        <div className="footnote col-10 col-mx-auto">
          {`Author: Longyue Han`}
        </div>

      </div>
    );
  }
}

export default Vis;
