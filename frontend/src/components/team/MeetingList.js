import { useLocation, NavLink } from 'react-router-dom'
import { 
    Grid,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import CreateMeeting from './CreateMeeting'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from '../../constants';
import { getUsers } from '../../util/APIUtils';
import { register } from '../meetingrooms/mainfunction/Kurento/conferenceroom';

export function MeetingList() {
  const { state } = useLocation();
  const roleType = state.data.roleType;
  const teamId = state.data.team.id;
  const teamName = state.data.team.teamName;
  const user = state.data.user;
  const [users, setUsers] = useState([]);
  const [meetingList, setMeetingList] = useState(<Grid>회의를 생성하세요</Grid>);
  const [reLoad, setReload] = useState(true);
 
  useEffect(() => {
    getUsers()
    .then(response => {
      setUsers(response.map(user => ({id: user.id, email: user.email})));
      setReload(false);
    }).catch(error => {
      console.log(error);
    });
  }, [reLoad]);

  useEffect(() => {
    axios.get(API_BASE_URL + "/meeting/team/" + teamId)
    .then((response => {
      setMeetingList(response.data.map(meeting => {
        const url = `${meeting.id}`
        return (
          <Grid
            key={meeting.id}
            item xs={4}
            sx={{
              p:1
            }}
          >
            <Card>
              <CardContent>
                { meeting.endTime ? (
                  <NavLink
                    to={url}
                    state={{meeting: meeting}}
                  >
                    {meeting.topic}
                  </NavLink>
                ) : (
                  <NavLink
                    to= 'meetingroom'
                    state={{meeting: meeting}}
                  >
                    {meeting.topic}
                  </NavLink>
                  
                )}
              </CardContent>
            </Card>
          </Grid>
        )}))
    })).catch(((error) => {
      console.log(error)
    }));
  }, [teamId]);

  return (
    <Grid
      item
      xs={12}
      container
      spacing={2}
      sx={{
        backgroundColor: '#009688',
        mt: 2,
        p: 2,
      }}
    >
      <Grid item container>
        {meetingList}
      </Grid>
      { roleType === 'LEADER' ? (
        <Grid item container>
          <NavLink
            to='update'
            state={{
              teamId:teamId,
              teamLeaderId:user.id,
              users:users,
              teamName:teamName
            }}
          >
            <Button
              variant="contained"
              sx={{textDecoration: 'none'}}
            >
              팀 관리
            </Button>
          </NavLink>
          <CreateMeeting teamId={teamId} setReload={setReload}/>
        </Grid>
      ) : (<div></div>)}
    </Grid>
  );
};
