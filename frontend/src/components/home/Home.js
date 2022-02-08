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
      <h3 className='better'>Better than meetings</h3>
    </Grid>
    
    <Grid className='introBox' container>
      <Grid item xs={1}/>
      <Grid item xs={5}>
        <img className='meetingImage' src={require('./img/회의일러스트.png')} alt="meeting"></img>
      </Grid>
      <Grid className='introLetter' item xs={5}>
        <br></br>
        <div className='title'>
          회의가 성공으로 가는 지름길
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='content'>
          여기는 회의가 서툰 사람들이 좀 더 효율적인 아이디어를
        </div>
        <div className='content'>
          발상하기를 원하는 여러분들을 위한 곳 입니다.
        </div>
        <br></br>
        <br></br>
        <div className='content'>
          우리가 제공하는 회의 기능을 사용해서 당신의 창의적인
        </div>
        <div className='content'>
          생각과 참신한 의견을 맘껏 펼쳐 보세요.
        </div>
        <br></br>
        <br></br>
        <div className='content'>
          여러분들이 가지고 있는 많은 생각들을 Beyond Meeting를 통해서
        </div>
        <div className='content'>
          쉽고 간편하게 밖으로 이끌어 보세요.
        </div>
      </Grid>
      <Grid item xs={1}/>
    </Grid>

    <Grid className='introSixHat' container>
      <Grid item xs={1}/>
      <Grid item xs={5}>
        <div className='title'>
          여섯 색깔 모자 기법
        </div>
        <div>
          이 기법은 에드웨드 드 보노(Edward de Bono) 박사가
        </div>
      </Grid>
      <Grid item xs={5}>

      </Grid>
      <Grid item xs={1}/>
    </Grid>

    <div className="img_">
      <img src={require("./img/그림1.png")} alt="karina"></img>
    </div>
    <button onClick={() => window.open("http://localhost:3000/meetingroom", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, menubar=yes")}>meetingroom</button>
  </div>
  );
};
