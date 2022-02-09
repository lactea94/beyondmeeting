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
      <hr className='logoLine'></hr>
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

    <Grid className='introSixHatBox' container>
      <Grid item xs={1}/>
      <Grid className='introSixHat' item xs={5}>
        <div className='title'>
          여섯 색깔 모자 기법
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='contentHat'>
          창의적 사고와 사고를 기술로 직접 가르치는 분야의 권위자인 
        </div>
        <div className='contentHat'>
          에드워드 드 보노(Edward de Bono)박사가 제안한
        </div>
        <div className='contentHat'>
          창의적 사고를 위한 회의 기법입니다.
        </div>
        <br></br>
        <br></br>
        <div className='contentHat'>
          이 기법은 세대, 대륙 및 신념 체계를 아우르고 있으며, 
        </div>
        <div className='contentHat'>
          Apple 및 British Airways와 같은 주요 기업의 이사회에서, 
        </div>
        <div className='contentHat'>
          아프리카 시골의 강의실에서도 똑같이 영향력을 행사합니다.
        </div>
        <br></br>
        <br></br>
        <div className='contentHat'>
          우리는 결정을 내릴 때 장단점을 생각하고 이에 따른 감정을 느낍니다.
        </div>
        <div className='contentHat'>
          동시에 다가오는 감정, 생각을 나누어 다른 사람과 공유하며
        </div>
        <div className='contentHat'>
          생각의 복잡성을 버리고 생각이 명확하고 단순해진다면
        </div>
        <div className='contentHat'>
          빠르고 쉽게 결론에 다다를 수 있습니다.
        </div>
      </Grid>
      <Grid container item xs={5}>
        <Grid container item xs={6}>
          <Grid item xs={4} className='hatBox'>
            <img className='redHat' src={require('./img/723.png')} alt='cap'></img>
          </Grid>
          <Grid className='hatBox' item xs={8}>
            <div className='hatIntro'>
              - 당신은 직관주의자입니다.
            </div>
            <div>
              - 방금 떠오르는 생각을 
            </div>
            <div className='hatIntro'>
              &nbsp; 가감없이 말하세요.
            </div>
            <div>
              - 논리적일 필요도 없습니다.
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={4} className='hatBox'>
            <img className='blueHat' src={require('./img/723.png')} alt='cap'></img>
          </Grid>
          <Grid className='hatBox' item xs={8}>
            <div className='hatIntro'>
              - 당신은 사회자입니다.
            </div>
            <div>
              - 다른 사람의 이야기를 듣고
            </div>
            <div className='hatIntro'>
              &nbsp; 회의를 잘 조직해 보세요.
            </div>
            <div>
              - 결론을 이끌어 내세요.
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={4} className='hatBox'>
            <img className='greenHat' src={require('./img/723.png')} alt='cap'></img>
          </Grid>
          <Grid className='hatBox' item xs={8}>
            <div className='hatIntro'>
              - 당신은 아이디어뱅크입니다.
            </div>
            <div>
              - 창의성과 새로운 아이디어를
            </div>
            <div className='hatIntro'>
              &nbsp; 제시하세요.
            </div>
            <div>
              - 조금 터무니없어도 좋아요.
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={4} className='hatBox'>
            <img className='whiteHat' src={require('./img/723.png')} alt='cap'></img>
          </Grid>
          <Grid className='hatBox' item xs={8}>
            <div className='hatIntro'>
              - 당신은 분석가입니다.
            </div>
            <div>
              - 항상 중립적으로 떨어져서
            </div>
            <div className='hatIntro'>
              &nbsp; 회의를 지켜보세요.
            </div>
            <div>
              - 객관적인 사실만 말하세요.
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={4} className='hatBox'>
            <img className='blackHat' src={require('./img/723.png')} alt='cap'></img>
          </Grid>
          <Grid className='hatBox' item xs={8}>
            <div className='hatIntro'>
              - 당신은 비평가입니다.
            </div>
            <div>
              - 아이디어의 약점을 찾아보며
            </div>
            <div className='hatIntro'>
              &nbsp; 약점을 잡아내세요.
            </div>
            <div>
              - 비판적으로 지적하세요.
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={4} className='hatBox'>
            <img className='yellowHat' src={require('./img/723.png')} alt='cap'></img>
          </Grid>
          <Grid className='hatBox' item xs={8}>
            <div className='hatIntro'>
              - 당신은 낙관주의자입니다.
            </div>
            <div>
              - 항상 아이디어의 희망과
            </div>
            <div className='hatIntro'>
              &nbsp; 장점을 바라보세요.
            </div>
            <div>
              - 터무니없지만 않으면 돼요.
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}/>
    </Grid>
  </div>
  );
};
