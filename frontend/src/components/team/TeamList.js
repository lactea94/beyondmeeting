import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { getCurrentUser } from '../../util/APIUtils';
import CreateTeam from './CreateTeam';

export function TeamList() {
  const [user, setUser] = useState('');
  const [teams, setTeams] = useState(null);
  const [reLoad, setReload] = useState(true);

  useEffect(() => {
    getCurrentUser()
    .then(response => {
      setUser(response);
      setReload(false);
    }).catch(error => {
      console.log(error);
    }); 
  }, [reLoad]);

  useEffect(() => {
    if (user)
      setTeams(user.userHasTeamList.map((data) => {
        const team = data.team
        const url = `${team.id}`
        return (
          <Grid
            key={team.id}
            item xs={4}
            sx={{p:2}}
          >
            <Card>
              <CardHeader
                avatar={(data.roleType === 'LEADER') && <StarsIcon/>}
                title={team.teamName}
              />
              <CardActions>
                <NavLink
                  to={url}
                  id={team.id}
                  state={{data: data}}
                >
                  <Button>
                   DETAIL 
                  </Button>
                </NavLink>
              </CardActions>
            </Card>
          </Grid>
        )}));
  }, [user]);

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <CreateTeam
          setReload={setReload}
        />
      </Grid>
      <Grid item
        container
        xs={12}
      >
        {teams}
      </Grid>
    </Grid>
  );
};