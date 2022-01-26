import { Grid, Card, CardContent} from '@mui/material';

function MeetingList(props) {
  const meets = props.user.team[props.nowTeamIndex].meeting
  const nameList = meets.map((name) =>
  <Grid item xs={4} sx={{p:'1'}} key={name}>
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

export default MeetingList;