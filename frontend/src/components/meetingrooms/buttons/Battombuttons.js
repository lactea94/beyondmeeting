import React, { useState } from 'react';
import { IconButton, Button, Modal, Card, Grid, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as RedHat } from '../img/hat.svg';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { leaveRoom, mute } from '../rooms/MeetingRoom.js';
import { useNavigate } from 'react-router-dom';
import { finishMeeting } from '../../../util/APIUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { ModalStyle } from '../rooms/ModalStyle';


const theme = createTheme({
  palette: {
    veryPeri: {
      main: '#6667ab'
    }
  }
})

const Battombuttons = (props) => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  function handleOpen() {setOpen(true)};
  function handleClose() {setOpen(false)};
  const [message, setMessage] = useState('');

  function handleChange({ target: {value} }) {setMessage(value)};

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
            { !props.muted ? (
              <FontAwesomeIcon icon={faMicrophone} />
              ) : (  
              <FontAwesomeIcon icon={faMicrophoneSlash} />
            )}
          </Button>
        </div>
        <div className="share-screen-button-box">
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
              props.getPart(props.participants)
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
            onClick={handleOpen}
          >
            채팅
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Card
              sx={ModalStyle()}
            >
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>팀 생성</Grid>
                <Grid item container
                  component="form"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  // onSubmit={}
                  >
                  <Grid item>
                    <TextField
                      label="팀 이름"
                      name="teamName"
                      value={message}
                      size="small"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                    >
                      생성
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Battombuttons;