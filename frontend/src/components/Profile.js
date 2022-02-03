import { useState } from "react";
import { Grid, Card } from '@mui/material';
import './Profile.css';
// https://studiomeal.com/archives/533
export function Profile() {
  const [userImg, setUserImg] = useState(false); // false는 유저 이미지를 가져왔더니 이미지가 기본 상태
  const username = 'park';// props써야지
  const userEmail = 'pjyc17@gmail.com'; //props 써야지
  const hatSpeakTime = [40000, 22000, 10000, 8004, 3000, 2800]// 순서는 정렬을 해서12/34/56 높은 순으로 3줄로 표현
  const speakTime = hatSpeakTime.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0); // 유저가 발언한 시간의 총 합 -> 초단위로 받음 reduce에 관한
  const user = {
    name: username,
    email: userEmail,
    hatSpeakTime: hatSpeakTime,
  };

  function calHour(SToH) {
    return parseInt(SToH / 3600);
  }
  function calMin(SToM) {
    return parseInt((SToM % 3600) / 60)
  }
  function calSec(SToS) {
    return parseInt((SToS % 60)%60)
  }

  function numRender() {
    const result = [];
    for (let i = 0; i < hatSpeakTime.length; i++) {
      result.push(
      <li key={`모자${i}`}>
        <img src={"./img/모자" + i + ".png"} alt=""></img>
        <p>Time Log : {calHour(hatSpeakTime[i]) } h {calMin(hatSpeakTime[i])} m {calSec(hatSpeakTime[i])}s</p>
      </li>);
    }
    return result;
  };

  // css 좌측 길게 / 우측 상단 / 우측 하단 3파트로 나눠서 분류 (우측 하단이 중요(그래프 화))
  return (
  <Grid container columnSpacing={3}>
    <Grid item container xs={3}>
      <Grid item xs={12}>
        { userImg ? (
          <h1>YOUR IMG IS HERE</h1>
        ) : (
          <div className="text-avatar">
            <span>Avatar</span>
          </div>
        )
        }
        <Grid item xs={12}>
        <div className="userInfo">
          <h3>name : {user.name}</h3>
          <h3>email : {user.email}</h3>
        </div>
        </Grid>
      </Grid>
      
    </Grid>
    <Grid item container xs={9} rowSpacing={5}>
      <Grid item xs={12}>
          <Card className="timeLog">
            <h1>Time Log : {calHour(speakTime)}h {calMin(speakTime)}m {calSec(speakTime)}s</h1>
          </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className="Card">
          <h3> 모자 별 시간 </h3>
          <ul>
            {numRender()}
          </ul>
        </Card>
      </Grid>
    </Grid>
  </Grid>
  )
};