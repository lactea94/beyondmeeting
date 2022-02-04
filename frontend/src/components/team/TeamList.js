// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import CreateTeam from './CreateTeam'


export function TeamList() {
  const user = {
    id: 0,
    teams: [
      {id:'124120', name:'팀 1', leader: true, meeting: ['a : 회의 완료', 'b : 회의 완료', 'c : 회의 중']},
      {id:'1213', name:'팀 2', leader: false, meeting: ['z', 's']},
      {id:'2123', name:'팀 3', leader: false, meeting: ['hi', 'hello', 'zbc', 'adf']}
    ],
  }
  // const [ testTeam, setTestTeam ] = useState({});

  // function callback(dic) {
  //   setTestTeam(dic);
  // }

  // useEffect(
  //   () => {
  //     axios({
  //       url: '/team',
  //       method: 'GET'
  //     }).then((res) => {
  //       callback(res.data);
  //     })
  //   }, []
  // );
  
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
