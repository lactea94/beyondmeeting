import { useLocation  } from 'react-router-dom'
import { 
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import ManageTeam from './modal/ManageTeam'
import CreateMeeting from './modal/CreateMeeting'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';

export function MeetingList() {
  const { state } = useLocation();
  const roleType = state.data.roleType;
  const teamId = state.data.team.id;
  const [meetingList, setMeetingList] = useState(<Grid>회의를 생성하세요</Grid>);

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
          {ManageTeam()}
          {CreateMeeting()}
        </Grid>
      ) : (<div></div>)}
    </Grid>
  );
};
