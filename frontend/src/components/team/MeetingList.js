import { useLocation, NavLink } from 'react-router-dom'
import { 
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import CreateMeeting from './modal/CreateMeeting'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { getUsers } from '../../util/APIUtils';

export function MeetingList() {
  const { state } = useLocation();
  const roleType = state.data.roleType;
  const teamId = state.data.team.id;
  const user = state.data.user
  const [users, setUsers] = useState([]);
  const [meetingList, setMeetingList] = useState(<Grid>회의를 생성하세요</Grid>);
  
  useEffect(() => {
    getUsers()
    .then(response => {
      setUsers(response.map(user => {
        return (
          {id: user.id, email: user.email}
        )
      })) 
    }).catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    axios.get(API_BASE_URL + "/meeting/team/" + teamId)
    .then((response => {
      setMeetingList(response.data.map(meeting => {
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
                {meeting.topic}
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
            state={{teamId:teamId, teamLeaderId:user.id, users:users}}
          >
            회의 관리
          </NavLink>
          {CreateMeeting()}
        </Grid>
      ) : (<div></div>)}
    </Grid>
  );
};
