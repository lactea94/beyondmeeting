import './Home.css';
import { Grid } from '@mui/material';

export function Home () {

  return (
  <div>
    <Grid>
      <h2 className='middleLetter'>지금부터 회의를 시작합니다.</h2>
    </Grid>
    <Grid className="mainLogoGrid">
      <img className="mainLogoImage" src={require("./img/검정로고2.png")} alt="logoimage"></img>
    </Grid>
    <Grid>
      <hr className='divideLine'></hr>
    </Grid>
    <Grid>
      <h3 className='better'>Better then meetings</h3>
    </Grid>
    
    <Grid container>
      <div item xs={5}>
        <img src={require('./img/회의일러스트.svg')} alt="meeting"></img>
      </div>
      <div item xs={5}>
        <h3>
          우리는 당신의 회의를 성공으로 이끌고 싶습니다.
        </h3>
        <div>
          여기는 회의가 서툰 사람들이 좀 더 효율적인 아이디어를,
        </div>
        <div>
          발상하기를 원하는 여러분들을 위한 곳 입니다.
        </div>
        <br></br>
        <div>
          우리가 제공하는 회의 기능을 사용해서 당신의 창의적인
        </div>
        <div>
          생각과 참신한 의견을 맘껏 펼쳐 보세요.
        </div>
      </div>
    </Grid>

    <div className="img_">
      <img src={require("./img/그림1.png")} alt="karina"></img>
    </div>
    <button onClick={() => window.open("http://localhost:3000/meetingroom", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, menubar=yes")}>meetingroom</button>
  </div>
  );
};
