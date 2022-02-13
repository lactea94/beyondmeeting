import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios from 'axios'

function request (options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

    // url = 'http://localhost:3000/test' 
    // method:'POST', 
    // header: { 
    //     'Accept':'application/json', 
    //     'Content-Type': 'application/json';charset=UTP-8'
     
    // },
    //  data: { 
    //      name: 'jungHo', 
    //      age: 23 
    //     } 
    //     axios(options) 
    //     .then(response => console.log(response)) 
    

 
// function axiosTest() {
//     axios.get(API_BASE_URL + '/users')
//       .then((response)=> {
//         console.log(response.data)  
//       }).catch(function (error) {
//         console.log(error)
//       });
//   }

//-------------------------------USER READ-----------------------------

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
    
}
  
export function getUsers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users",
        method: 'GET'
    });
  }

  export function getOneUser(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/"+id,
        method: 'GET'
    });
  }

//-------------------------------USER CREATE-----------------------------
//혹시 그냥 로그인이나 회원가입 할 때 
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

//-------------------------------USER DELETE-----------------------------

// export function deleteUser(id) {
//     return request({
//         url: API_BASE_URL + "/user/"+id,
//         method: 'DELETE',
//     });
// }

//-------------------------------TEAM CREATE-----------------------------
export function createTeam(createTeamRequest) {
    return request({
        url: API_BASE_URL + "/team",
        method: 'POST',
        body: JSON.stringify(createTeamRequest)
    });
}

export function inviteTeamMember(inviteTeamMemberRequest) {
    return request({
        url: API_BASE_URL + "/team/member",
        method: 'POST',
        body: JSON.stringify(inviteTeamMemberRequest)
    });
}

//-------------------------------TEAM READ-----------------------------
export function getTeams() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/teams",
        method: 'GET'
    });
  }

  export function getOneTeam(teamId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/team/member/" + teamId,
        method: 'GET'
    });
  }

//-------------------------------TEAM UPDATE-----------------------------
export function updateTeamName(teamId,UpdateTeamNameReq) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/team/" + teamId,
        method: 'PUT',
        body: JSON.stringify(UpdateTeamNameReq)
    });
  }

  export function updateLeader(teamId,updateLeaderReq) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/team/leader/" + teamId,
        method: 'PUT',
        body: JSON.stringify(updateLeaderReq)
    });
  }

//-------------------------------TEAM DELETE-----------------------------
  export function deleteTeam(teamId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/team/" + teamId,
        method: 'DELETE'
    });
  }

  export function deleteTeamMember(teamId,userId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/team/member/" + teamId + "/" + userId,
        method: 'DELETE'
    });
  }

  // ============================== 회의 조회 ==============================

/** 회의 전체 리스트 조회 */
export function getMeetingList() {
    axios({
        method: "get",
        url: API_BASE_URL + "/meeting/list",
        // headers: {
        //     'Authorization': `bearer ` + localStorage.getItem(ACCESS_TOKEN)
        // }
    })
    // axios.get(API_BASE_URL + "/meeting/list", {
    //     headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` }
    // })
        .then((response) => {
            // response Action
            console.log(response.data)
        })
        .catch(function (error) {
            // response Action
            console.log(error)
            console.log("no available token")
        });
}

/** 특정 회의 아이디를 갖는 회의 단건 조회 */
export function getMeetingByMeetingId(meetingId) {
    axios.get(API_BASE_URL + "/meeting/" + meetingId)
        .then((response) => { console.log(response.data) })
        .catch(function (error) { console.log(error) });
}

/** 특정 팀 아이디를 갖는 회의 리스트 조회 */
export function getMeetingByTeamId(teamId) {
    axios.get(API_BASE_URL + "/meeting/team/" + teamId)
    .then((response) => { console.log(response.data) })
    .catch(function (error) { console.log(error) });
}

/** 회의 참여자 전체 리스트 조회 */
export function getUserHasMeeting() {
    axios.get(API_BASE_URL + "/userhasmeeting/list")
    .then((response) => { console.log(response.data) })
    .catch(function (error) { console.log(error) });
}

/** 특정 회의 아이디를 갖는 회의 참여자 리스트 조회 */
export function getUserHasMeetingByMeetingId(meetingId) {
    axios.get(API_BASE_URL + "/userhasmeeting/" + meetingId)
    .then((response) => { console.log(response.data) })
    .catch(function (error) { console.log(error) });
}

// ============================== 회의 생성, 참여, 종료 ==============================

/** 미팅 생성 */
export function createMeeting(requestCreateMeeting) {
    axios({
        url: API_BASE_URL + "/meeting/create",
        method: "POST",
        data: {
            topic: requestCreateMeeting.topic,
            meetingType: requestCreateMeeting.meetingType,
            teamId: requestCreateMeeting.teamId
        }
    })
    // axios.post(API_BASE_URL + "/meeting/create",
    //     {
    //         topic: "topic name : axios test",
    //         meetingType: "SIXHAT",
    //         teamId: 110
    //     }
    // )
    .then((response) => {console.log(response.data)})
    .catch(function (error) { console.log(error) });
}

/** 미팅 참여 */
export function joinMeeting(requestJoinMeeting) {
    axios({
        url: API_BASE_URL + "/meeting/join",
        method: "POST",
        data: {
            meetingId: requestJoinMeeting.meetingId,
            userId: requestJoinMeeting.userId,
            hatColor: requestJoinMeeting.hatColor,
            speakingTime: requestJoinMeeting.speakingTime
            }
    })
    .then((response) => { console.log(response.data) })
    .catch(function (error) { console.log(error) });
}

/** 미팅 종료 */
// export function finishMeeting() {
//     axios.post(API_BASE_URL + "/meeting/finish")
//     .then((response) => { console.log(response.data) })
//     .catch(function (error) { console.log(error) });
// }