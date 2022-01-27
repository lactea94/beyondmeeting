import { NavLink, Outlet } from 'react-router-dom'
import { Grid, Card, CardContent} from '@mui/material';

export function TeamList () {
  const user = {
    id: 0,
    teams: [
      {id:'124120', name:'팀 1', leader: true, meeting: ['a : 회의 완료', 'b : 회의 완료', 'c : 회의 중']},
      {id:'1213', name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:'2123', name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
  }
  const teamList = user.teams.map((team) => {
    const url = `${team.id}`
    return(
      <Grid item xs={4} key={team.id}>
        <NavLink
          to={{
            pathname: url,
            state: {
              team: {team}
            }
          }}
        >
          <Card>
            <CardContent>
              {team.name}
            </CardContent>
          </Card>
        </NavLink>
      </Grid>
    )
  })
  return (
    <Grid container>
      <Grid item container>
        {teamList}
      </Grid>
      <Outlet/>
    </Grid>
  );
};
