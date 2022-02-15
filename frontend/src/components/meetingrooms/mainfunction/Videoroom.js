import React from 'react';
import './Videoroom.css';
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
    sendMessage 
  } from './Kurento/conferenceroom.js';

export default function Videoroom() {

  return (
    <div id='participants' className="video-box">

    </div>
  );
};
