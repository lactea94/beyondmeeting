import React from 'react';
import "./Meetingroom.css"
import { useState } from 'react';
import { Grid, IconButton, Button } from '@mui/material/'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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

const theme = createTheme({
  palette: {
    veryPeri: {
      main: '#6667ab'
    }
  }
})

export const Meetingroom = () => {
  const [openHatInfo, setOpenHatInfo] = useState(true);
  const [openChatInfo, setOpenChatInfo] = useState(false);
  const [openMemberInfo, setOpenMemberInfo] = useState(false);
  const [muted, setMuted] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const [exit, setExit] = useState(false);

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
      </Grid>
      <Grid className="bottomBarBox" item xs={12}>
        <ThemeProvider theme={theme}>
          <div className="leftBar">
            <Button 
              className="hatButton"
              variant="outlined" 
              startIcon={<RedHat width="20"/>} 
              size="large"
              color="veryPeri"
              onClick={() => {
                setOpenHatInfo(!openHatInfo)
                console.log("openHatInfo is", openHatInfo)
                }}
            >
            모자
            </Button>
          </div>
          <div className="middleBar">
            <div className="muteButtonBox">
              <Button 
                className="muteButton" 
                variant="contained" 
                size="large"
                color="veryPeri"
                onClick={() => {
                  setMuted(!muted)
                  console.log("muted is", muted)
                }}
              >
                음소거
              </Button>
            </div>
            <div className="shareScreenButtonBox">
            <Button 
                className="shareScreenButton" 
                variant="outlined" 
                size="large"
                color="veryPeri"
                onClick={() => {
                  setShareScreen(!shareScreen)
                  console.log("shareScreen is", shareScreen)
                }}
              >
                화면공유
              </Button>
            </div>
            <div className="exitButtonBox">
              <IconButton
                onClick={() => {
                  setExit(!exit)
                  console.log("exit is", exit)
                }}
              >
                <CancelRoundedIcon className="exitButton"></CancelRoundedIcon>
              </IconButton>
            </div>
          </div>
          <div className="rightBar">
            <div className="memberButtonBox">
              <Button
                className="memberButton"
                variant="outlined"
                size="large"
                color="veryPeri"
                onClick={() => {
                  setOpenMemberInfo(!openMemberInfo)
                  console.log("openMemberInfo is", openMemberInfo)
                }}
              >
                참여자
              </Button>
            </div>
            <div className="chatRoomButtonBox">
              <Button
                className="chatRoomButton"
                variant="outlined"
                size="large"
                color="veryPeri"
                onClick={() => {
                  setOpenChatInfo(!openChatInfo)
                  console.log("openChatInfo is", openChatInfo)
                }}
              >
                채팅
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </Grid>
    </Grid>
    );
};

