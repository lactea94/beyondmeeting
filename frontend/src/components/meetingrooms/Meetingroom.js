import React from 'react';
import './Meetingroom.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material/';
import styled from 'styled-components';
import Hatinfo from './mainfunction/Hatinfo.js';
import Videoroom from './mainfunction/Videoroom.js';
import Memberinfo from './mainfunction/Memberinfo.js';
import Chat from './mainfunction/Chat.js';
import Battombuttons from './buttons/Battombuttons';
import { register } from './mainfunction/Kurento/conferenceroom';

const Theme = styled.div`
  font-size: 18px;
  color: rgb(146, 208, 80);
  font-weight: bold;
  @media only screen and (max-width: 900px) {
    font-size: 12px;
  }
`;

export const Meetingroom = () => {
  const { state } = useLocation()
  const topic = state.meeting.topic
  const meetingId = state.meeting.id
  const userName = state.user.name
  const [isRegistered, setIsRegistered] = useState(false)
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
    register(userName, meetingId);
    setIsRegistered(true)
  }, [userName, meetingId])

  // useEffect(() => {
  //   if (isRegistered) {
      
  //   }
  // }, [isRegistered])

  useEffect(() => {
    if (openHatInfo === true && openChatInfo === true && openMemberInfo === true) {
      setLeftBoxStyle({ width: "18%" })
      setMiddleBoxStyle({ width: "64%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "60%" })
      setMemberBoxStyle({ height: "40%" })
    } else if (openHatInfo === true && openChatInfo === true && openMemberInfo === false) {
      setLeftBoxStyle({ width: "18%" })
      setMiddleBoxStyle({ width: "64%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "100%" })
      setMemberBoxStyle({ height: "0%" })
    } else if (openHatInfo === false && openChatInfo === true && openMemberInfo === true) {
      setLeftBoxStyle({ width: "0%" })
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "60%" })
      setMemberBoxStyle({ height: "40%" })
    } else if (openHatInfo === true && openChatInfo === false && openMemberInfo === true) {
      setLeftBoxStyle({ width: "18%" })
      setMiddleBoxStyle({ width: "64%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "0%" })
      setMemberBoxStyle({ height: "100%" })
    } else if (openHatInfo === true && openChatInfo === false && openMemberInfo === false) {
      setLeftBoxStyle({ width: "18%" })
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle({ width: "0%" })
      setChatBoxStyle({ height: "0%" })
      setMemberBoxStyle({ height: "0%" })
    } else if (openHatInfo === false && openChatInfo === false && openMemberInfo === true) {
      setLeftBoxStyle({ width: "0%" })
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle({ width: "18%" })
      setChatBoxStyle({ height: "0%" })
      setMemberBoxStyle({ height: "100%" })
    } else if (openHatInfo === false && openChatInfo === true && openMemberInfo === false) {
      setLeftBoxStyle({ width: "0%" })
      setMiddleBoxStyle({ width: "82%" })
      setRightBoxStyle( { width: "18%" })
      setChatBoxStyle({ height: "100%" })
      setMemberBoxStyle({ height: "0%" })
    } else if (openHatInfo === false && openChatInfo === false && openMemberInfo === false) {
      setLeftBoxStyle({ width: "0%" })
      setMiddleBoxStyle({ width: "100%" })
      setRightBoxStyle({ width: "0%" })
      setChatBoxStyle({ height: "0%" })
      setMemberBoxStyle({ height: "0%" })
    }
  }, [openHatInfo, openChatInfo, openMemberInfo])

  return (
    <Grid className="room" container>
      <Grid className="theme-box" item xs={12}>
        <Theme>
          {topic}
        </Theme>
      </Grid>
      <Grid className="main-func-box" item xs={12}>
        {openHatInfo ? 
          <div className="left-box" style={leftBoxStyle}>
            <Hatinfo></Hatinfo>
          </div>
          : null
        }
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
          muted={muted} setMuted={setMuted}
          shareScreen={shareScreen} setShareScreen={setShareScreen}
          exit={exit}  setExit={setExit}
        ></Battombuttons>
      </Grid>
    </Grid>
    );
};

