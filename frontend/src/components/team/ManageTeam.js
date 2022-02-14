import { Button, Card, Autocomplete, TextField, Grid, Input } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FRONT_BASE_URL } from '../../constants';
import { getOneTeam, inviteTeamMember, deleteTeam, deleteTeamMember, updateTeamName } from '../../util/APIUtils';

export function ManageTeam() {
  const { state } = useLocation()
  const teamId = state.teamId
  const teamLeaderId = state.teamLeaderId
  const [teamName, setTeamName] = useState(state.teamName)
  const users = state.users;
  const [currentTeam, setCurrentTeam] = useState([]);
  const [currentTeamId, setCurrentTeamId] = useState([]);
  const [currentTeamList, setCurrentTeamList] = useState([]);
  const [member, setMemeber] = useState({});
  const [submitMember, setSubmitMember] = useState(false);
  const [deleteMember, setDeleteMember] = useState(false);
  
  const handleChangeTeamName = ({ target: {value} }) => setTeamName(value);
  
  const handleSubmitTeamName = (event) => {
    event.preventDefault()
    updateTeamName(teamId, {teamName:teamName})
  };

  const handleChangeMember = (event, value) => setMemeber(value);
  
  const handleSubmitMember = (event) => {
    event.preventDefault()
    inviteTeamMember({team: teamId, user: member.id})
    setSubmitMember(true)
  };
  
  const handleDeleteTeam = () => {
    deleteTeam(teamId)
    window.location.href = FRONT_BASE_URL + '/team'
  }

  useEffect(() => {
    getOneTeam(teamId)
    .then(response => {
      setCurrentTeam(response.map(member => member.user))
      setSubmitMember(false)
      setDeleteMember(false)
    }).catch(error => {
      console.log(error)
    })
  }, [submitMember, deleteMember, teamId])

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
                id={member.id}
                onClick={(event) => {
                  deleteTeamMember(teamId, event.target.id)
                  setDeleteMember(true)
                }}
              >삭제</Button>
            : null}
          </div>
        )
      }))
  }, [currentTeam, teamId, teamLeaderId])
  
  return (
    <Card>
      팀 관리
      <Grid
        component="form"
        onSubmit={handleSubmitTeamName}
      >
        <TextField
          label="팀 이름"
          defaultValue={teamName}
          onChange={handleChangeTeamName}
        />
        <Button
          type="submit"
          variant="contained"
        >
          수정
        </Button>
      </Grid>
      <Grid
        component="form"
        onSubmit={handleSubmitMember}
      >
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
          onChange={handleChangeMember}
        />
        <Button
          type="submit"
          variant="contained"
        >
          추가
        </Button>
      </Grid>
      <Button
        variant="contained"
        onClick={handleDeleteTeam}
      >
        팀 삭제
      </Button>
      {currentTeamList}
    </Card>
  );
};

export default ManageTeam;