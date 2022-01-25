import Grid from '@mui/material/Grid';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function Team() {
  const user = {
    leader: true,
    team: [
      {id:0, name:'팀 1', leader: true, meeting: ['a', 'b', 'c']},
      {id:1, name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:2, name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
    nowTeam: 0
  }
  let CreateButton
  if (user.team[user.nowTeam].leader) {
    CreateButton =
      <Grid item xs={8}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end'
          }}
        >
          <Button item variant="contained" sx={{m:1}}>회의 생성</Button>
          <Button item variant="contained" sx={{m:1}}>팀 관리</Button>
        </Box>
      </Grid>
  }

  function teamList() {
    const names = []
    for (let index = 0; index < user.team.length; index++) {
      names.push(user.team[index].name)
    }
    const nameList = names.map((name) =>
      <Grid item>
        <Card sx={{m:1}}>
          <CardContent>
            {name}
          </CardContent>
        </Card>
      </Grid>
    )
    return (
      <Grid
      item
      container
      direction='column'
      sx={{
        width: '100%',
        backgroundColor: '#fb8c00',
        m: 1,
      }}
    >
      {nameList}
    </Grid>
    )
  }

  function meetList() {
    const meets = user.team[user.nowTeam].meeting
    const nameList = meets.map((name) =>
      <Grid item xs={4} sx={{p:'1'}}>
        <Card sx={{m:1}}>
          <CardContent>
            {name}
          </CardContent>
        </Card>
      </Grid>
    )
    return (
      <Grid
      item
      container
      sx={{
        width: '100%',
        backgroundColor: '#009688',
        m: 1,
      }}
      >
        {nameList}
      </Grid>
    )
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
        {teamList()}
      </Grid>
      <Grid item xs={8}container>
        {meetList()}
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" sx={{m:1}}>팀 생성</Button>
      </Grid>
      {CreateButton}
    </Grid>
  );
}