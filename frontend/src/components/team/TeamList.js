import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import CreateTeam from './modal/createteam/CreateTeam'
import { getCurrentUser, getOneUser } from '../../util/APIUtils';

export function TeamList() {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(null);
  const [teams, setTeams] = useState(null);
  useEffect(() => {
    getCurrentUser()
    .then(response => {
      setUserId(response.id)
    }).catch(error => {
      console.log(error)
    });
  }, []);
  useEffect(() => {
    if (userId)
      getOneUser(userId)
      .then(response => {
        setUser(response)
      }).catch(error => {
        console.log(error)
      });
  }, [userId]);
  useEffect(() => {
    if (user)
      setTeams(user.userHasTeamList.map((data) => {
        const url = `${data.team.id}`
        return (
          <NavLink
            key={data.team.id}
            to={url}
            id={data.team.id}
            state={{data: data}}
          >
            <ListItem>
              <ListItemButton>
                {data.team.teamName}
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}));
  }, [user]);

  return (
    <Grid container spacing={2}>
      <Grid
        item xs={4}
        container
        direction={'column'}
      >
        <Grid item>
          <List>
            {teams}
          </List>
        </Grid>
        {CreateTeam()}
      </Grid>
    </Grid>
  );
};
