import { useState } from 'react'
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
      {id:124120, name:'팀 1', leader: true, meeting: ['a : 회의 완료', 'b : 회의 완료', 'c : 회의 중']},
      {id:1213, name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:2123, name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
    leader: true
  }
  
  const [nowTeamIndex, setNowTeamIndex] = useState(1)

  let manageTeamButtons
  if (user.team[nowTeamIndex].leader) {
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
        <TeamList user={user} nowTeamIndex={nowTeamIndex} setNowTeamIndex={setNowTeamIndex}/>
      </Grid>
      <Grid item xs={8} container>
        <MeetingList user={user} nowTeamIndex={nowTeamIndex}/>
      </Grid>
      {CreateTeam()}
      {manageTeamButtons}
    </Grid>
  );
}