import React from 'react';
import { IconButton, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as RedHat } from '../img/hat.svg';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { leaveRoom, mute } from '../rooms/MeetingRoom.js';
import { useNavigate } from 'react-router-dom';
import { finishMeeting } from '../../../util/APIUtils';


const theme = createTheme({
  palette: {
    veryPeri: {
      main: '#6667ab'
    }
  }
})

const Battombuttons = (props) => {
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <div className="left-bar">
        { (props.meetingType === 'SIXHAT') &&
        <Button 
          className="hat-button"
          variant="outlined" 
          startIcon={<RedHat width="20"/>} 
          size="large"
          color="veryPeri"
          onClick={() => {
            props.setOpenHatInfo(!props.openHatInfo)
            console.log("openHatInfo is", props.openHatInfo)
            }}
        >
        모자
        </Button>}
      </div>
      <div className="middle-bar">
        <div className="mute-button-box">
          <Button 
            className="mute-button" 
            variant="contained" 
            size="large"
            color="veryPeri"
            onClick={() => {
              props.setMuted(!props.muted);
              mute(props.muted);
              console.log("muted is", props.muted);
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
              props.setShareScreen(!props.shareScreen);
              console.log("shareScreen is", props.shareScreen);
            }}
        >
            화면공유
          </Button>
        </div>
        <div className="exit-button-box">
          <IconButton
            onClick={() => {
              props.setExit(!props.exit);
              console.log("exit is", props.exit);
              leaveRoom();
              if (props.roleType === 'LEADER') {
                finishMeeting({meetingId: props.meetingId})
              }
              navigate(-1);
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
              props.setOpenMemberInfo(!props.openMemberInfo)
              console.log("openMemberInfo is", props.openMemberInfo)
              // props.setParti(props.participants)
              console.log(props.participants)
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
              props.setOpenChatInfo(!props.openChatInfo)
              console.log("openChatInfo is", props.openChatInfo)
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