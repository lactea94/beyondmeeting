import React, { useState, useEffect }  from 'react';
import './Videoroom.css';
import { Grid } from '@mui/material'
import 
  { getChannelName, 
    register, 
    onNewParticipant, 
    receiveVideoResponse, 
    callResponse, 
    onExistingParticipants, 
    leaveRoom, 
    receiveVideo, 
    onParticipantLeft, 
    onReceiveMsg, 
    sendMessage ,
    lenParticipant
  } from './Kurento/conferenceroom.js';


export default function Videoroom() {
  const [attendee, setAttendee] = useState(0)
  
  useEffect(() => {
    const attend = document.getElementsByClassName('participant').length
    setAttendee(attend)
    console.log(attendee)
  }, [])
  return (
    <Grid container id='participants' className="video-box"></Grid>
  );
};
