import { Grid, Box } from '@mui/material';
import TeamList from './TeamList'
import MeetingList from './MeetingList'
import CreateTeam from './CreateTeam'
import CreateMeeting from './CreateMeeting'
import ManageTeam from './ManageTeam'

export function Team() {
  
  const user = {
    id: 0,
    team: [
      {id:0, name:'팀 1', leader: true, meeting: ['a : 회의 완료', 'b : 회의 완료', 'c : 회의 중']},
      {id:1, name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:2, name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
    nowTeamId: 0,
    leader: true
  }
  
  let manageTeamButtons
  if (user.team[user.nowTeamId].leader) {
    manageTeamButtons =
      <Grid item xs={8}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end'
          }}
        >
          {CreateMeeting()}
          {ManageTeam()}
        </Box>
      </Grid>
  }

  return (
    <Grid container>
      <Grid className='team-list-title' item xs={4}>
        팀 목록
      </Grid>
      <Grid className='meeting-list-title' item xs={8}>
        회의 목록
      </Grid>
      <Grid item xs={4} container>
        <TeamList user={user}/>
      </Grid>
      <Grid item xs={8} container>
        <MeetingList user={user}/>
      </Grid>
      {CreateTeam()}
      {manageTeamButtons}
    </Grid>
  );
}