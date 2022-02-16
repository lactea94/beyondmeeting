import React from 'react';
import { IconButton, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as RedHat } from '../img/hat.svg';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { leaveRoom, register } from '../mainfunction/Kurento/conferenceroom';


const theme = createTheme({
  palette: {
    veryPeri: {
      main: '#6667ab'
    }
  }
})

const Battombuttons = ({ openHatInfo, setOpenHatInfo, openChatInfo, setOpenChatInfo, openMemberInfo, setOpenMemberInfo, muted, setMuted, shareScreen, setShareScreen, exit, setExit }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="left-bar">
        <Button 
          className="hat-button"
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
      <div className="middle-bar">
        <div className="mute-button-box">
          <Button 
            className="mute-button" 
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
        <div className="share-screen-button-box">
        <Button 
            className="share-screen-button" 
            variant="outlined" 
            size="large"
            color="veryPeri"
            onClick={() => {
              setShareScreen(!shareScreen);
              console.log("shareScreen is", shareScreen);
              register();
            }}
          >
            화면공유
          </Button>
        </div>
        <div className="exit-button-box">
          <IconButton
            onClick={() => {
              setExit(!exit)
              console.log("exit is", exit)
              leaveRoom()
            }}
          >
            <CancelRoundedIcon className="exit-button"></CancelRoundedIcon>
          </IconButton>
        </div>
      </div>
      <div className="right-bar">
        <div className="member-button-box">
          <Button
            className="member-button"
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
        <div className="chat-room-button-box">
          <Button
            className="chat-room-button"
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
  );
};

export default Battombuttons;