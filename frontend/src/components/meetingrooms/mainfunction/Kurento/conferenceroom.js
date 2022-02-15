/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import Participant from './participant.js';
import { WebRtcPeer } from 'kurento-utils';

// var ws = new WebSocket('wss://localhost/groupcall');
// var ws = new WebSocket('wss://i6c101.p.ssafy.io/groupcall');
var ws;
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

// ws.onmessage = function(message) {
// 	var parsedMessage = JSON.parse(message.data);
// 	console.info('Received message: ' + message.data);

// 	switch (parsedMessage.id) {
// 	case 'existingParticipants':
// 		onExistingParticipants(parsedMessage);
// 		break;
// 	case 'newParticipantArrived':
// 		onNewParticipant(parsedMessage);
// 		break;
// 	case 'participantLeft':
// 		onParticipantLeft(parsedMessage);
// 		break;
// 	case 'receiveVideoAnswer':
// 		receiveVideoResponse(parsedMessage);
// 		break;
// 	case 'iceCandidate':
// 		participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
// 	        if (error) {
// 		      console.error("Error adding candidate: " + error);
// 		      return;
// 	        }
// 	    });
// 	    break;
// 	case 'sendChat':
// 		onReceiveMsg(parsedMessage);
// 		break;
// 	default:
// 		console.error('Unrecognized message', parsedMessage);
// 	}
// }

export function register(userName, room) {
	ws = new WebSocket('wss://i6c101.p.ssafy.io/groupcall');

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
	// ws.onopen = (e) => {
	// 	alert("[open] 커넥션이 만들어졌습니다.");
	// 	alert("데이터를 서버에 전송해봅시다.");
	// 	console.log(e)
	// 	ws.send("My name is Bora");
	// };
	// name = document.getElementById('name').value;
	// var room = document.getElementById('roomName').value;
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
	console.log(name + " registered in room " );
	var participant = new Participant(name);
	participants[name] = participant;
	var video = participant.getVideoElement();

	var options = {
						localVideo: video,
						mediaConstraints: constraints,
						onicecandidate: participant.onIceCandidate.bind(participant),
		//----------------------
						dataChannelConfig: {
							id : getChannelName(),
							// onopen : onOpen,
							// onclose : onClosed
						},
						dataChannels : true,
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
	// var participant = participants[request.name];
	// participant.dispose();
	// delete participants[request.name];
}

export default function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
	ws.onopen = () => ws.send(jsonMessage);
}
