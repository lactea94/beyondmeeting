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
  return (
    <Grid container id='participants' className="video-box"></Grid>
  );
};
