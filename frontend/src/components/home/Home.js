import './Home.css';
import { Grid } from '@mui/material';

export function Home () {

  return (
  <div>
    <Grid className="mainLogoGrid">
      <img className="mainLogoImage" src={require("./img/검정로고2.png")} alt="logoimage"></img>
    </Grid>
    <Grid>
      <h2 style={{ color: 'white' }}>지금부터 회의를 시작합니다.</h2>
    </Grid>
    <div className="img_">
      <img src={require("./img/그림1.png")} alt="karina"></img>
    </div>
    <button onClick={() => window.open("http://localhost:3000/meetingroom", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, menubar=yes")}>meetingroom</button>
  </div>
  );
};
