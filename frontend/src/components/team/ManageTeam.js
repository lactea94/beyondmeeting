import { Button, Card, Autocomplete, TextField, Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOneTeam, inviteTeamMember, deleteTeam } from '../../util/APIUtils';

function ManageTeam() {
  const { state } = useLocation()
  const teamId = state.teamId
  const teamLeaderId = state.teamLeaderId
  const users = state.users;
  const [currentTeam, setCurrentTeam] = useState([]);
  const [currentTeamId, setCurrentTeamId] = useState([]);
  const [currentTeamList, setCurrentTeamList] = useState([]);
  const [member, setMemeber] = useState({});
  const [submit, setSubmit] = useState(false);
  
  useEffect(() => {
    getOneTeam(teamId)
    .then(response => {
      setCurrentTeam(response.map(member => member.user))
      setSubmit(false)
    }).catch(error => {
      console.log(error)
    })
  }, [submit, teamId])

  useEffect(() => {
    if (currentTeam)
      setCurrentTeamId(currentTeam.map(member => member.id))
      setCurrentTeamList(currentTeam.map(member => {
        return (
          <div
            key={member.id}
          >
            { member.email }
            { member.id !== teamLeaderId ?
              <Button
                onClick={() => {deleteTeam(teamId, member.id)}}
              >삭제</Button>
            : null}
          </div>
        )
      }))
  }, [currentTeam])

  const handleChange = (event, value) => {
    setMemeber(value)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(member)
    inviteTeamMember({team: teamId, user: member.id})
    setMemeber({})
    setSubmit(true)
  };

  return (
    <Card>
      <Grid
        component="form"
        onSubmit={handleSubmit}
      >
        팀 관리
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.email}
            getOptionDisabled={(option) =>
              currentTeamId.some(value => value===option.id)
            }
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
              {...params}
              label="팀원"
              />
              )}
            onChange={handleChange}
          />
          <Button
            type="submit"
          >
            추가
          </Button>
      </Grid>
      {currentTeamList}
    </Card>
  );
};

export default ManageTeam;