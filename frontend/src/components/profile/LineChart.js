import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { getCurrentUser, getAttendersByUserId } from '../../util/APIUtils';
import { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/LoadingIndicator';

const data = [
  { argument: "1월", value: 10 },
  { argument: "6월", value: 20 },
  { argument: "12월", value: 30 },
];

export default function LineChart() {
  const [userId, setUserId] = useState('');
  const [userHasMeetingList, setUserHasMeetingList] = useState();
  const [meeting, setMeeting] = useState('');
  const [loading, setLoading] = useState(true);

  // 유저가 매달 회의에 참여한 횟수를 라인그래프로..!
  // 세로축 회의참여횟수, 가로축 n개월
  // 회의참여횟수는 starttime
  useEffect(() => {
    getAttendersByUserId(1)
     .then(response => {

      // setUserHasMeetingList(response.data.userHasMeetingList[0].meeting)
      
      // setUser(response)
      // setUserName(response.userName)
      // setUserEmail(response.userEmail)
      // setUserImg(response.userImage)
      // setLoading(false)
      setLoading(false)
      console.log(response.data)
    }).catch(error => {
      console.log(error)
      setLoading(false)
    });
  }, []);


  return (
  <Paper>
    <Chart
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />
      {loading ? <LoadingIndicator /> : (<LineSeries valueField="value" argumentField="argument" />) }
      
      <Animation />
    </Chart>
  </Paper>
  )
};