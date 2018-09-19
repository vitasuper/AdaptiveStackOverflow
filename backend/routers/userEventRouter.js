const express = require('express');
const router = express.Router();
const UserEvent = require('../database/models/userEvent');
const moment = require('moment');

/*
  Post a user event via its name and event type.
*/
router.post('/:username/types/:type', (req, res) => {
  const currentUsername = req.params.username;
  const thisEventType = req.params.type;
  const thisExtra = req.body.extraInfo;

  // console.log("print object detail" + JSON.stringify(req.body, null, 4));
  
  UserEvent.findOne({ username: currentUsername}, (err, userevent) => {
    if (err) {
      console.log('ERR - backend/routers/userEventRouter.js - POST error: ', err);
    } else if (userevent) {  // userEvent for this user exist
      userevent.events.push({
        timeStamp: new Date(),
        eventType: thisEventType,
        extraInfo: thisExtra,
      });
      userevent.save((err, updatedUserEvents) => {
        if (err) console.log('===ohmygodgeterror 1===');
        if (err) return res.json(err);
        res.json(updatedUserEvents);
      });
    } else { // userEvent for this user doesn't exist
      const newUserEvent = new UserEvent({
        username: currentUsername,
        events: [],
      });

      newUserEvent.events.push({
        timeStamp: new Date(),
        eventType: thisEventType,
        extraInfo: thisExtra,
      });

      newUserEvent.save((err, updatedUserEvents) => {
        if (err) console.log('===ohmygodgeterror 2===');
        if (err) return res.json(err);
        res.json(updatedUserEvents);
      });
    }
  });
});

/*
  Get user events via its name and event type.
*/
router.get('/:username/types', (req, res) => {
  const currentUsername = req.params.username;
  const thisEventType = req.params.type;

  UserEvent.findOne({ username: currentUsername}, (err, userevent) => {
    if (err) {
      console.log('ERR - backend/routers/userEventRouter.js - GET error: ', err);
    } else if (userevent) {  // userEvent for this user exist
      let events = userevent.events;
      
      // Get core values and send to frontend to generate the visualization
      
      let wordsListStr = '';

      let stayTimeSum = 0.0;
      let loginCnt = 0;
      let loginTimestamps = [];
      let clickTitleTimestamps = [];
      let bookmarkTimestamps = [];

      let currentTime = moment().local();
      let aWeekAgoFromNow = moment(currentTime).subtract(7, 'days');

      for (let i = 0; i < events.length; ++i) {
        if (events[i]['eventType'] === 'userSelectTextEvent') {
          wordsListStr = wordsListStr + ' ' + events[i]['extraInfo'];
        } else if (events[i]['eventType'] === 'userStaytimeEvent') {
          stayTimeSum = stayTimeSum + parseFloat(events[i]['extraInfo']);
          loginCnt += 1;
          loginTimestamps.push(events[i]['timeStamp']);
        } else if (events[i]['eventType'] === 'userStaytimeEvent') {
          stayTimeSum = stayTimeSum + parseFloat(events[i]['extraInfo']);
          loginCnt += 1;
          loginTimestamps.push(events[i]['timeStamp']);
        } else if (events[i]['eventType'] === 'userClickTitleEvent') {
          if (moment(events[i]['timeStamp']).local().isBetween(aWeekAgoFromNow, currentTime)) {
            clickTitleTimestamps.push(events[i]['timeStamp']);
          }
        } else if (events[i]['eventType'] === 'userBookmarkEvent') {
          if (moment(events[i]['timeStamp']).local().isBetween(aWeekAgoFromNow, currentTime)) {
            bookmarkTimestamps.push(events[i]['timeStamp']);
          }
        }
      }

      let averageStayTime = 0;
      if (loginCnt != 0) {
        averageStayTime = stayTimeSum / loginCnt;
      }

      // console.log("print object detail" + JSON.stringify(parseClickAndBookmarkTimestampsToLineData(clickTitleTimestamps, bookmarkTimestamps), null, 4));
      res.json({
        wordCloudData: parseWordListToWordCloudData(wordsListStr),
        avarageStayTime: averageStayTime,
        loginCnt: loginCnt,
        calendarData: parseLoginTimestampsToCalendarData(loginTimestamps),
        dailyData: parseLoginTimestampsToDailyData(loginTimestamps),
        weeklyData: parseLoginTimestampsToWeeklyData(loginTimestamps),
        lineData: parseClickAndBookmarkTimestampsToLineData(clickTitleTimestamps, bookmarkTimestamps),
      });
      
    } else { // userEvent for this user doesn't exist
      res.json('current user do not have these type of event');
    }
  });
});

/*
  [
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000000 },
    { text: 'duck', value: 10 },
  ]
*/
function parseWordListToWordCloudData(wordListStr) {
  var common = "just,really,poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

  var wordCount = {};
  var words = wordListStr.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
  if (words.length == 1){
    wordCount[words[0]] = 1;
  } else {
    words.forEach(function(word) {
      // var word = word.toLowerCase();
      if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
        if (wordCount[word]){
          wordCount[word]++;
        } else {
          wordCount[word] = 1;
        }
      }
    })
  }

  var items = Object.keys(wordCount).map(function(key) {
      return [key, wordCount[key]];
  });

  items.sort(function(first, second) {
      return second[1] - first[1];
  });

  wordCount = {};
  for (var i = 0; i < items.length; ++i) {
    wordCount[items[i][0]] = items[i][1];
  }

  var wordCountData = [];
  for (var word in wordCount) {
    wordCountData.push({
      text: word,
      value: wordCount[word],
    });
  }

  return wordCountData;
}

/*
[
  {day: '2019-02-07',value: 222},
  {day: '2019-08-27',value: 251},
  {day: '2019-09-11',value: 187},
]
*/
function parseLoginTimestampsToCalendarData(loginTimestamps) {
  let dateCnt = {};
  for (let i = 0; i < loginTimestamps.length; ++i) {
    var local = moment(loginTimestamps[i]).local().format('YYYY-MM-DD');
    dateCnt[local] = (dateCnt[local] || 0) + 1;
  }

  let calendarData = [];
  for (var date in dateCnt) {
    calendarData.push({
      day: date,
      value: dateCnt[date],
    });
  }
  
  return calendarData;
}

/*
[
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
]
*/
function parseLoginTimestampsToDailyData(loginTimestamps) {
  let dateCnt = {};
  let morningCnt = 0, afternoonCnt = 0, eveningCnt = 0;

  for (let i = 0; i < loginTimestamps.length; ++i) {
    var format = 'hh:mm:ss';
    var local = moment(loginTimestamps[i]).local();

    local = moment(local, format);

    var morningStartTime = moment('00:00:00', format);
    var morningEndTime = moment('12:00:00', format);
    var afternoonStartTime = moment('12:00:01', format);
    var afternoonEndTime = moment('18:00:00', format);
    var eveningStartTime = moment('18:00:01', format);
    var eveningEndTime = moment('23:59:59', format);
    
    if (local.isBetween(morningStartTime, morningEndTime)) {
      morningCnt += 1;
    } else if (local.isBetween(afternoonStartTime, afternoonEndTime)) {
      afternoonCnt += 1;
    } else {
      eveningCnt += 1;
    }
  }

  let dailyData = [];
  dailyData.push({
    id: "Morning", label: "Morning", value: morningCnt,
  });
  dailyData.push({
    id: "Afternoon", label: "Afternoon", value: afternoonCnt,
  });
  dailyData.push({
    id: "Evening", label: "Evening", value: eveningCnt,
  });
  
  return dailyData;
}

/*
[
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
  ...
]
*/
function parseLoginTimestampsToWeeklyData(loginTimestamps) {
  let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let weekdayCnt = {};

  for (let i = 0; i < loginTimestamps.length; ++i) {
    var local = moment(loginTimestamps[i]).local();
    local = moment(local, 'YYYY-MM-DD');
    var day = local.day();
    weekdayCnt[week[day]] = (weekdayCnt[week[day]] || 0) + 1;
  }

  let weeklyData = [];
  for (let i = 1; i < 8; ++i) {
    var dayIndex = i % 7;
    weeklyData.push({
      id: week[dayIndex], label: week[dayIndex], value: (weekdayCnt[week[dayIndex]] || 0),
    })
  }

  return weeklyData;
}

/*
[
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
*/
function parseClickAndBookmarkTimestampsToLineData(clickTitleTimestamps, bookmarkTimestamps) {
  let lineData = [];
  let currentTime = moment().local();
  let aWeekAgoFromNow = moment(currentTime).subtract(7, 'days');

  let clickTitleDateCnt = {}, bookmarkDateCnt = {};
  for (let i = 0; i < clickTitleTimestamps.length; ++i) {
    var local = moment(clickTitleTimestamps[i]).local();
    local = moment(local).format('YYYY-MM-DD').toString();
    clickTitleDateCnt[local] = (clickTitleDateCnt[local] || 0) + 1;
  }
  for (let i = 0; i < bookmarkTimestamps.length; ++i) {
    var local = moment(bookmarkTimestamps[i]).local();
    local = moment(local).format('YYYY-MM-DD').toString();
    bookmarkDateCnt[local] = (bookmarkDateCnt[local] || 0) + 1;
  }

  var clickTitleData = [], bookmarkData = [];
  // iterate 7 days from a week ago to today
  for (var m = moment(aWeekAgoFromNow); m.diff(currentTime, 'days') <= 0; m.add(1, 'days')) {
    var date = m.format('YYYY-MM-DD').toString();
    clickTitleData.push({
      x: date, y: (clickTitleDateCnt[date] || 0),
    });
    bookmarkData.push({
      x: date, y: (bookmarkDateCnt[date] || 0),
    });
  }

  lineData.push({
    id: 'Click question title(s) count', data: clickTitleData,
  });
  lineData.push({
    id: 'Bookmark question(s) count', data: bookmarkData,
  });

  return lineData;
}


module.exports = router;
