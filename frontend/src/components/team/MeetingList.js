import { useLocation  } from 'react-router-dom'
import { 
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import ManageTeam from './ManageTeam'
import CreateMeeting from './CreateMeeting'

export function MeetingList() {
  const { state } = useLocation()
  const teamLeader = state.team.leader
  
  const meetingList = state.team.meeting.map((meeting) => {
    return (
      <Grid
        key={meeting}
        item xs={4}
        sx={{
          p:1
        }}
      >
        <Card>
          <CardContent>
            {meeting}
          </CardContent>
        </Card>
      </Grid>
    )
  })
  

  return (
    <Grid
      item
      xs={8}
      container
      spacing={2}
      sx={{
        backgroundColor: '#009688',
        height: '50rem',
        mt: 2,
        p: 2,
      }}
    >
      <Grid item container>
        {meetingList}
      </Grid>
      { teamLeader ? (
        <Grid item container>
          {ManageTeam()}
          {CreateMeeting()}
        </Grid>
      ) : (<div></div>)}
    </Grid>
  );
};
