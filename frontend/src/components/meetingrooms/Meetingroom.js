import React from 'react';
import "./Meetingroom.css"
import { useState, useEffect } from 'react';
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

  let [leftBoxStyle, setLeftBoxStyle] = useState({
    width: "18%"
  })

  let [middleBoxStyle, setMiddleBoxStyle] = useState({
    width: "82%"
  })

  let [rightBoxStyle, setRightBoxStyle] = useState({
    width: "0%"
  })

  let [chatBoxStyle, setChatBoxStyle] = useState({
    height: "0%"
  })
  
  let [memberBoxStyle, setMemberBoxStyle] = useState({
    height: "0%"
  })

  useEffect(() => {
    if (openHatInfo === true && openChatInfo === true && openMemberInfo === true) {
      setLeftBoxStyle(leftBoxStyle = { width: "18%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "64%" })
      setRightBoxStyle(rightBoxStyle = { width: "18%" })
      setChatBoxStyle(chatBoxStyle = { height: "60%" })
      setMemberBoxStyle(memberBoxStyle = { height: "40%" })
    } else if (openHatInfo === true && openChatInfo === true && openMemberInfo === false) {
      setLeftBoxStyle(leftBoxStyle = { width: "18%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "64%" })
      setRightBoxStyle(rightBoxStyle = { width: "18%" })
      setChatBoxStyle(chatBoxStyle = { height: "100%" })
      setMemberBoxStyle(memberBoxStyle = { height: "0%" })
    } else if (openHatInfo === false && openChatInfo === true && openMemberInfo === true) {
      setLeftBoxStyle(leftBoxStyle = { width: "0%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "82%" })
      setRightBoxStyle(rightBoxStyle = { width: "18%" })
      setChatBoxStyle(chatBoxStyle = { height: "60%" })
      setMemberBoxStyle(memberBoxStyle = { height: "40%" })
    } else if (openHatInfo === true && openChatInfo === false && openMemberInfo === true) {
      setLeftBoxStyle(leftBoxStyle = { width: "18%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "64%" })
      setRightBoxStyle(rightBoxStyle = { width: "18%" })
      setChatBoxStyle(chatBoxStyle = { height: "0%" })
      setMemberBoxStyle(memberBoxStyle = { height: "100%" })
    } else if (openHatInfo === true && openChatInfo === false && openMemberInfo === false) {
      setLeftBoxStyle(leftBoxStyle = { width: "18%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "82%" })
      setRightBoxStyle(rightBoxStyle = { width: "0%" })
      setChatBoxStyle(chatBoxStyle = { height: "0%" })
      setMemberBoxStyle(memberBoxStyle = { height: "0%" })
    } else if (openHatInfo === false && openChatInfo === false && openMemberInfo === true) {
      setLeftBoxStyle(leftBoxStyle = { width: "0%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "82%" })
      setRightBoxStyle(rightBoxStyle = { width: "18%" })
      setChatBoxStyle(chatBoxStyle = { height: "0%" })
      setMemberBoxStyle(memberBoxStyle = { height: "100%" })
    } else if (openHatInfo === false && openChatInfo === true && openMemberInfo === false) {
      setLeftBoxStyle(leftBoxStyle = { width: "0%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "82%" })
      setRightBoxStyle(rightBoxStyle = { width: "18%" })
      setChatBoxStyle(chatBoxStyle = { height: "100%" })
      setMemberBoxStyle(memberBoxStyle = { height: "0%" })
    } else if (openHatInfo === false && openChatInfo === false && openMemberInfo === false) {
      setLeftBoxStyle(leftBoxStyle = { width: "0%" })
      setMiddleBoxStyle(middleBoxStyle = { width: "100%" })
      setRightBoxStyle(rightBoxStyle = { width: "0%" })
      setChatBoxStyle(chatBoxStyle = { height: "0%" })
      setMemberBoxStyle(memberBoxStyle = { height: "0%" })
    }
  }, [openHatInfo, openChatInfo, openMemberInfo])

  return (
    <Grid className="room" container>
      <Grid className="themeBox" item xs={12}>
        <Theme className="theme">
          회의 주제
        </Theme>
      </Grid>
      <Grid className="mainFuncBox" item xs={12}>
        {openHatInfo ? 
          <div className="leftBox" style={leftBoxStyle}>hat</div>
          : null
        }
        <div className="faceRoom" style={middleBoxStyle}>room</div>
        {openMemberInfo || openChatInfo ? 
          <div className="rightBox" style={rightBoxStyle}>
            {openMemberInfo ? 
              <div className="memberBox" item style={memberBoxStyle}>
                memberBox
              </div>
              : null
            }
            {openChatInfo ?
              <div className="chatBox" item style={chatBoxStyle}>
                chatBox
              </div> 
              : null
            }
          </div>
          : null
        }
        
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

