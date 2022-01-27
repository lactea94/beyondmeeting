import { useParams } from 'react-router-dom'
import { Grid, Card, CardContent} from '@mui/material';

export function MeetingList () {
  const user = {
    id: 0,
    teams: [
      {id:'124120', name:'팀 1', leader: true, meeting: ['a : 회의 완료', 'b : 회의 완료', 'c : 회의 중']},
      {id:'1213', name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:'2123', name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
  }
  const { teamId } = useParams()
  const teamList = user.teams
  const temp = []

  for (let index = 0; index < teamList.length; index++) {
    if (teamList[index].id === teamId) {
      temp.push(teamList[index])
      break
    }
  }
  const team = temp[0]
  const meetingList = team.meeting.map((meeting) => {
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
    <Grid item container spacing={2}>
      <Grid
        item xs={12}
        container
        sx={{
          backgroundColor: '#009688',
          height: '50rem',
          my: 1,
          py: 2
        }}
      >
        {meetingList}
      </Grid>
    </Grid>
  );
};
