import { Grid, Card, CardContent} from '@mui/material';

function TeamList(props) {
  const teams = props.user.team
  const teamList = []
  for (let index = 0; index < teams.length; index++) {
    teamList.push(
      <Grid item
      key={teams[index].id}
      >
        <Card sx={{m:1}}>
          <CardContent>
            {teams[index].name}
          </CardContent>
        </Card>
      </Grid> 
    )
  }

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
      {teamList}
    </Grid>
  );
};

export default TeamList;