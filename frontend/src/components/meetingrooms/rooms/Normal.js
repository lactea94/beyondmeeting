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
// import { register, getParticipants } from '../mainfunction/Kurento/conferenceroom';
import { joinMeeting } from '../../../util/APIUtils';

//------conferenceroom--------------------------------------------------------------
import Participant from '../mainfunction/Kurento/participant.js';
import { WebRtcPeer } from 'kurento-utils';


var ws = new WebSocket('wss://i6c101.p.ssafy.io/groupcall');;
var participants = {};
var name;
//----------------------

var chanId = 0;

export function getChannelName () {
	return "TestChannel" + chanId++;
}
//----------------------
window.onbeforeunload = function() {
	ws.close();
};

ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'existingParticipants':
		onExistingParticipants(parsedMessage);
		break;
	case 'newParticipantArrived':
		onNewParticipant(parsedMessage);
		break;
	case 'participantLeft':
		onParticipantLeft(parsedMessage);
		break;
	case 'receiveVideoAnswer':
		receiveVideoResponse(parsedMessage);
		break;
	case 'iceCandidate':
		participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
	        if (error) {
		      console.error("Error adding candidate: " + error);
		      return;
	        }
	    });
	    break;
	case 'sendChat':
		onReceiveMsg(parsedMessage);
		break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}

export function lenParticipant() {
	console.log(participants)
	return Object.keys(participants).length
}

export function getParticipants() {
	return participants;
}

export function register(userName, room) {
	name = userName;
	var room = room;
	
	var message = {
		id : 'joinRoom',
		name : name,
		room : room,
	}
	sendMessage(message);

	// document.getElementById('room-header').innerText = 'ROOM ' + room;
	// document.getElementById('join').style.display = 'none';
	// document.getElementById('room').style.display = 'block';
	// // --------------------------------------------------------------
	// var dataChannelSend = document.getElementById('dataChannelSend');
	// var sendButton = document.getElementById('send');
	// sendButton.addEventListener("click", function() {
	// 	var data = {
	// 		id : "chat",
	// 		userId:1,
	// 		meetingId:1,
	// 		data : "채팅테스트"
	// 	};
	// 	console.log("Send button pressed. Sending data " + data);
	// 	// webRtcPeer.send(data);
	// 	sendMessage(data);
	// 	dataChannelSend.value = "";
	// });

	//--------------------------------------------------------------

}

export function onNewParticipant(request) {
	receiveVideo(request.name);
}

export function receiveVideoResponse(result) {
	console.log("receiveVideoResponse : "+result);
	participants[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
		if (error) return console.error (error);
	});
}

export function callResponse(message) {
	if (message.response !== 'accepted') {
		console.info('Call not accepted by peer. Closing call');
		window.stop();
	} else {
		WebRtcPeer.processAnswer(message.sdpAnswer, function (error) {
			if (error) return console.error (error);
		});
	}
}

export function onExistingParticipants(msg) {
	var constraints = {
		audio : true,
		video : {
			mandatory : {
				maxWidth : 320,
				maxFrameRate : 15,
				minFrameRate : 15
			}
		}
	};
	console.log(name + " registered in room ");
	var participant = new Participant(name);
	participants[name] = participant;
	var video = participant.getVideoElement();
	console.log("video :",video);
 
	let options = {
						localVideo: video,
						mediaConstraints: constraints,
						onicecandidate: participant.onIceCandidate.bind(participant),
		//----------------------
						// dataChannelConfig: {
						// 	id : getChannelName(),
						// 	// onopen : onOpen,
						// 	// onclose : onClosed
						// },
						// dataChannels : true,
		//----------------------
	    			}
	participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options,
		function (error) {
		  if(error) {
			  return console.error(error);
		  }
		  this.generateOffer (participant.offerToReceiveVideo.bind(participant));
	});

	msg.data.forEach(receiveVideo);
}
// function onOpen(event) {
// 	dataChannelSend.disabled = false;
// 	dataChannelSend.focus();
// 	$('#send').attr('disabled', false);
// }

// function onClosed(event) {
// 	dataChannelSend.disabled = true;
// 	$('#send').attr('disabled', true);
// }
export function leaveRoom() {
	sendMessage({
		id : 'leaveRoom'
	});

	for ( var key in participants) {
		participants[key].dispose();
	}

	ws.close();
}

export function receiveVideo(sender) {
	var participant = new Participant(sender);
	participants[sender] = participant;
	var video = participant.getVideoElement();

	var options = {
		remoteVideo: video,
		onicecandidate: participant.onIceCandidate.bind(participant),
		configuration:{
			iceServers:[{
				"urls": 'turn:13.124.242.194:3478?transport=udp',
				"username": 'username1',
				"credential":'password1'
			}]
		}
    }

	participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options,
			function (error) {
			  if(error) {
				  return console.error(error);
			  }
			  this.generateOffer (participant.offerToReceiveVideo.bind(participant));
	});
}

export function onParticipantLeft(request) {
	console.log('Participant ' + request.name + ' left');
	var participant = participants[request.name];
	participant.dispose();
	delete participants[request.name];
}

export function onReceiveMsg(request) {
	console.log('receive from ' + request.name);
	console.log('msg : ' + request.data);
	return request;
	// var participant = participants[request.name];
	// participant.dispose();
	// delete participants[request.name];
}

export default function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
	ws.onopen = () => ws.send(jsonMessage);
	if (ws.readyState === 1) {
		ws.send(jsonMessage);
		console.log("readyState:", ws.readyState);
	}
}
//----------------------------------------------------------------------------


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
  const [parti, setParti] = useState([])
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

  // useEffect(() => {
  //   window.location.reload()
  // }, [])

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
    if (openChatInfo && !openMemberInfo) {
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
    setParti(party)
  }, [participants])
  console.log(participants)

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

