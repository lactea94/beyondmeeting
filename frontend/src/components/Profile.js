import { useState } from "react";
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
      <li>
        <img src={"./img/모자" + i + ".png"} alt=""></img>
        <p>Time Log : {calHour(hatSpeakTime[i]) } h {calMin(hatSpeakTime[i])} m {calSec(hatSpeakTime[i])}s</p>
      </li>);
    }
    return result;
  };

  // css 좌측 길게 / 우측 상단 / 우측 하단 3파트로 나눠서 분류 (우측 하단이 중요(그래프 화))
  return (
  <div className="container2">      
    <div className="profile-container">
      { userImg ? (
        <h1 className="profile-info">YOUR IMG IS HERE</h1>
      ) : (
        <div className="profRoundImg">
          <img src="img/그림1.png" alt="우왕" />
        </div>
      )
      }
      <div className="userInfo">
        <h1>name : {user.name}</h1>
        <h1>email : {user.email}</h1>
      </div>
    </div>
    <div className="logDetail">
      <div className="timeLog">
        <h1>Time Log : {calHour(speakTime) } h {calMin(speakTime)} m {calSec(speakTime)} s</h1>
      </div>
      <div>
        <h3> 모자 별 시간 </h3>
        <ul>
          {numRender()}
        </ul>
      </div>
    </div>
  </div>
  )
};