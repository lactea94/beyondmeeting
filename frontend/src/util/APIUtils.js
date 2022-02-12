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
