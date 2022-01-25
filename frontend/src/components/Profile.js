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
  
  return (
  <div className="container2">
    {/* <div className="item">A</div>
    <div className="item">B</div>
    <div className="item">C</div>
    <div className="item">D</div>
    <div className="item">E</div>
    <div className="item">F</div>
    <div className="item">G</div>
    <div className="item">H</div>
    <div className="item">I</div> */}
      
    <div className="profile-container">
      <div>
        {/* <button onClick={calHour}> click this </button> */}
        { userImg ? (
          <h1 className="profile-info">YOUR IMG IS HERE</h1>
        ) : (
          <div className="profRoundImg">
            <img src="img/그림1.png" alt="우왕" />
          </div>
        )
        }
      </div>
      <div className="userInfo">
        <h1>name : {user.name}</h1>
        <h1>email : {user.email}</h1>
      </div>
    </div>
    <div className="timeLog">
      <h1>Time Log : {calHour(speakTime) } h {calMin(speakTime)} m {calSec(speakTime)} s</h1>
    </div>
      <div>
        <h3> 모자 별 시간 </h3>
        <ul>
          <li>
            <img src="./img/모자1.png" alt="검은중절모" />
            <p>Time Log : {calHour(hatSpeakTime[0]) } h {calMin(hatSpeakTime[0])} m {calSec(hatSpeakTime[0])} s</p>
          </li>
          <li>
            <img src="./img/모자2.png" alt="노란중절모" />
            <p>Time Log : {parseInt(hatSpeakTime[1] / 3600) } h {parseInt((hatSpeakTime[1]%3600)/60)} m {(hatSpeakTime[1]%60)%60} s</p>
          </li>
          <li>
            <img src="./img/모자3.png" alt="빨간중절모" />
            <p>Time Log : {parseInt(hatSpeakTime[2] / 3600) } h {parseInt((hatSpeakTime[2]%3600)/60)} m {(hatSpeakTime[2]%60)%60} s</p>
          </li>
          <li>
            <img src="./img/모자4.png" alt="초록중절모" />
            <p>Time Log : {parseInt(hatSpeakTime[3] / 3600) } h {parseInt((hatSpeakTime[3]%3600)/60)} m {(hatSpeakTime[3]%60)%60} s</p>
          </li>
          <li>
            <img src="./img/모자5.png" alt="파랑중절모" />
            <p>Time Log : {parseInt(hatSpeakTime[4] / 3600) } h {parseInt((hatSpeakTime[4]%3600)/60)} m {(hatSpeakTime[4]%60)%60} s</p>
          </li>
          <li>
            <img src="./img/모자6.png" alt="하양중절모" />
            <p>Time Log : {parseInt(hatSpeakTime[5] / 3600) } h {parseInt((hatSpeakTime[5]%3600)/60)} m {(hatSpeakTime[5]%60)%60} s</p>
          </li>
        </ul>
    </div>
  </div>
  )
};