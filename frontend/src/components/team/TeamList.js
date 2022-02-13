// import axios from 'axios'
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import CreateTeam from './modal/createteam/CreateTeam'
import { getCurrentUser, getTeams, getUsers } from '../../util/APIUtils';

export function TeamList() {
  const user = {
    id: 0,
    teams: [
      {id:'124120', name:'팀 1', leader: true, meeting: ['a : 회의 완료', 'b : 회의 완료', 'c : 회의 중']},
      {id:'1213', name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:'2123', name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
  }
  // const [user, setUser] = useState('')
  // const [teams, setTeams] = useState('')

  // useEffect(() => {
  //   getCurrentUser()
  //   .then(response => {
  //     setUser(response)
  //   }).then(getTeams())
  //   .then(response => {
  //     console.log(response)
  //   })     
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }, [])
  // console.log(user)
  const teamList = user.teams.map((team) => {
    const url = `${team.id}`
    return(
      <NavLink
        key={team.id}
        to={url}
        state={{team: team}}
      >
        <ListItem>
          <ListItemButton>
              {team.name}
          </ListItemButton>
        </ListItem>
      </NavLink>
    )
  })
  return (
    <Grid container spacing={2}>
      <Grid
        item xs={4}
        container
        direction={'column'}
      >
        <Grid item>
          <List>
            {teamList}
          </List>
        </Grid>
        {CreateTeam()}
      </Grid>
      <Outlet/>
    </Grid>
  );
};
