import React from 'react';
import "./Meetingroom.css"
import { useState } from 'react';
import { Grid, IconButton, Button } from '@mui/material/'
import styled from 'styled-components'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ReactComponent as RedHat } from './img/hat.svg'

const Theme = styled.div`
  font-size: 18px;
  @media only screen and (max-width: 900px) {
    font-size: 12px;
  }
`

// const BottomBar = styled.div`
//   font-size: 18px;
//   @media only screen and (max-width: 900px) {
//     font-size: 12px;
//   }
// `

export const Meetingroom = () => {
  const [openHatInfo, setOpenHatInfo] = useState(true);
  const [openChatInfo, setOpenChatInfo] = useState(false);
  const [openMemberInfo, setOpenMemberInfo] = useState(false);



  return (
    <Grid className="room" container>
      <Grid className="themeBox" item xs={12}>
        <Theme className="theme">
          회의 주제
        </Theme>
      </Grid>
      <Grid className="mainFuncBox" item xs={12}>
        <div className="hatHanger">hat</div>
        <div className="faceRoom">room</div>
        <div className="chat">chat</div>
        {/* <div className="mainFunc">회의 주요 기능</div> */}
      </Grid>
      <Grid className="bottomBarBox" container item xs={12}>
        <Grid className="bottomBar" item xs={2}>
          <Button 
            variant="outlined" 
            startIcon={<RedHat width="20"/>} 
            onClick={() => {
              setOpenHatInfo(!openHatInfo)
              console.log("openHatInfo is", openHatInfo)
              }}
          >
          모자
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid className="bottomBar" item xs={2}>
          음소거
        </Grid>
        <Grid className="bottomBar" item xs={2}>
          화면공유
        </Grid>
        <Grid className="bottomBar" item xs={1}>
          <IconButton>
            <CancelRoundedIcon className="exitButton"></CancelRoundedIcon>
          </IconButton>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid 
          className="bottomBar" 
          item 
          xs={1}
          onClick={() => {
            setOpenMemberInfo(!openMemberInfo)
            console.log("openMemberInfo is", openMemberInfo)
          }}
        >
          참여자
        </Grid>
        <Grid 
          className="bottomBar" 
          item 
          xs={1}
          onClick={() => {
            setOpenChatInfo(!openChatInfo)
            console.log("openChatInfo is", openChatInfo)
          }}
        >
          채팅
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Grid>
    );
};

