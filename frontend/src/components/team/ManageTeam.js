import { Button, Card, Autocomplete, TextField, Grid, CardHeader, CardContent } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOneTeam, inviteTeamMember, deleteTeam, deleteTeamMember, updateTeamName } from '../../util/APIUtils';

export function ManageTeam() {
  const { state } = useLocation()
  const navigate = useNavigate()
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
  const [isDeleted, setIsDeleted] = useState(false);
  
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
    setIsDeleted(true)
  }

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false)
      navigate(-2)
    }
  }, [isDeleted])

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
    <Card
      sx={{
        mt:'10rem',
        mx:'20rem'
      }}
    >
      <CardHeader
        title='팀 관리'
      />
      <CardContent>
        <Grid
          container
          direction="row"
          alignItems="center"
          component="form"
          onSubmit={handleSubmitTeamName}
        >
          <Grid item xs={5}>
            <TextField
              label="팀 이름"
              defaultValue={teamName}
              onChange={handleChangeTeamName}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              type="submit"
              variant="contained"
            >
              수정
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={handleDeleteTeam}
            >
              팀 삭제
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid
          container
          alignItems="center"
          spacing={2}
          component="form"
          onSubmit={handleSubmitMember}
        >
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
            >
              추가
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {currentTeamList}
    </Card>
  );
};

export default ManageTeam;