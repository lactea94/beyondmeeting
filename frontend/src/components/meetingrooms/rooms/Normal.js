import React from 'react';
import './Meetingroom.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material/';
import styled from 'styled-components';
import Videoroom from '../mainfunction/Videoroom.js';
import Memberinfo from '../mainfunction/Memberinfo.js';
import Chat from '../mainfunction/Chat.js';
import Battombuttons from '../buttons/Battombuttons';
import { register, getParticipants } from '../mainfunction/Kurento/conferenceroom';
import { joinMeeting } from '../../../util/APIUtils';

const Theme = styled.div`
  font-size: 18px;
  color: rgb(146, 208, 80);
  font-weight: bold;
  @media only screen and (max-width: 900px) {
    font-size: 12px;
  }
`;

export function Normal() {
  const { state } = useLocation();
  const [first, setFirst] = useState(true)
  const topic = state.meeting.topic;
  const userId = state.user.id;
  const meetingId = state.meeting.id;
  const userName = state.user.name;
  const roleType = state.roleType;
  const teamId = state.meeting.team.id;
  const [isRegistered, setIsRegistered] = useState(false);
  const [openHatInfo, setOpenHatInfo] = useState(true);
  const [openChatInfo, setOpenChatInfo] = useState(false);
  const [openMemberInfo, setOpenMemberInfo] = useState(false);
  const [muted, setMuted] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const [exit, setExit] = useState(false);
  const [participants, setParticipants] = useState([])
  const party = getParticipants()

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
    register(userName, meetingId);
    setIsRegistered(true)
  }, [userName, meetingId])

  useEffect(() => {
    joinMeeting({
      meetingId: meetingId,
      userId: userId,
      hatColor: 'NORMAL'
    }).catch(error => {
      console.log(error)
    })
  }, [meetingId, userId])

  useEffect(() => {
    if (openChatInfo && openMemberInfo) {
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "60%" })
      setMemberBoxStyle({ height: "40%" })
    } else if (!openChatInfo && openMemberInfo) {
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "0%" })
      setMemberBoxStyle({ height: "100%" })
    } else if (openChatInfo && !openMemberInfo) {
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle( { width: "18%" })
      setChatBoxStyle({ height: "100%" })
      setMemberBoxStyle({ height: "0%" })
    } else if (!openChatInfo && !openMemberInfo) {
      setMiddleBoxStyle({ width: "100%" })
      setRightBoxStyle({ width: "0%" })
      setChatBoxStyle({ height: "0%" })
      setMemberBoxStyle({ height: "0%" })
    }
  }, [openChatInfo, openMemberInfo])

  useEffect(() => {
    setParticipants(party)
  }, [party])
  console.log(getParticipants())

  return (
    <Grid className="room" container>
      <Grid className="theme-box" item xs={12}>
        <Theme>
          {topic}
        </Theme>
      </Grid>
      <Grid className="main-func-box" item xs={12}>
        <div className="video-room" style={middleBoxStyle}>
          <Videoroom></Videoroom>
        </div>
        {openMemberInfo || openChatInfo ? 
          <div className="right-box" style={rightBoxStyle}>
            {openMemberInfo ? 
              <div className="member-box" item style={memberBoxStyle}>
                <Memberinfo></Memberinfo>
              </div>
              : null
            }
            {openChatInfo ?
              <div className="chat-box" item style={chatBoxStyle}>
                <Chat></Chat>
              </div> 
              : null
            }
          </div>
          : null
        }
        
      </Grid>
      <Grid className="bottom-bar-box" item xs={12}>
        <Battombuttons
          openHatInfo={openHatInfo} setOpenHatInfo={setOpenHatInfo}
          openChatInfo={openChatInfo} setOpenChatInfo={setOpenChatInfo}
          openMemberInfo={openMemberInfo} setOpenMemberInfo={setOpenMemberInfo}
          muted={muted} setMuted={setMuted} teamId={teamId} meetingId={meetingId}
          shareScreen={shareScreen} setShareScreen={setShareScreen}
          exit={exit}  setExit={setExit} isSix={false} roleType={roleType}
        ></Battombuttons>
      </Grid>
    </Grid>
    );
};

