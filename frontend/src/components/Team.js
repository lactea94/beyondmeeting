import Grid from '@mui/material/Grid';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function Team() {
  const user = {
    leader: true,
    team: [
      {id:0, name:'팀 1', leader: true, meeting: [1, 2,]},
      {id:1, name:'팀 2', leader: false},
      {id:2, name:'팀 3', leader: false}
    ],
    nowTeam: 0
  }
  let create
  if (user.team[user.nowTeam].leader) {
    create =
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
  return (
    <Grid container>
      <Grid item xs={4} container>
        <Grid className='team-list-title' item>
          <h1>팀 목록</h1>
        </Grid>
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
          <Grid item>
            <Card sx={{m:1}}>
              <CardContent>
                1팀
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{m:1}}>
              <CardContent>
                1팀
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}container>
        <Grid className='meeting-list-title' item>
          <h1>회의 목록</h1>
        </Grid>
        <Grid
          item
          container
          sx={{
            width: '100%',
            backgroundColor: '#009688',
            m: 1,
          }}
        >
          <Grid item xs={4} sx={{p:'8'}}>
            <Card sx={{m:1}}>
              <CardContent>
                회의 1
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sx={{px:'1'}}>
            <Card sx={{m:1}}>
              <CardContent>
                회의 2
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sx={{px:'1'}}>
            <Card sx={{m:1}}>
              <CardContent>
                회의 3
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sx={{px:'1'}}>
            <Card sx={{m:1}}>
              <CardContent>
                회의 4
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
          <Button variant="contained" sx={{m:1}}>팀 생성</Button>
        </Grid>
      {create}
    </Grid>
  );
}