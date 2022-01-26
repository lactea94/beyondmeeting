import { Grid, Card, CardContent} from '@mui/material';

function TeamList(props) {
  const countTeam = props.user.team.length
  const names = []
  for (let index = 0; index < countTeam; index++) {
    names.push(props.user.team[index].name)
  }
  const nameList = names.map((name) =>
    <Grid item key={name}>
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
  );
};

export default TeamList;