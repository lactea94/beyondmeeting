import { Grid, Button, Modal, Card, Autocomplete, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { getOneTeam, getUsers } from '../../../util/APIUtils';
import ModalStyle from './ModalStyle';
import UserList from './UserList';

function ManageTeam(teamId) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentTeam, setCurrentTeam] = useState([]);
  const [teamLeader, setTeamLeader] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getOneTeam(teamId)
    .then(response => {
      setCurrentTeam(response.map(member => {
        if (member.roleType === 'LEADER') {
          setTeamLeader({id: member.user.id, email:member.user.email})
        }
        return (
          <div
            key={member.user.id}
          >{member.user.email}</div>
        );
      }))})
    .catch(error => {
      console.log(error)
    });
  }, [teamId])

  useEffect(() => {
    if (teamLeader)
      getUsers()
      .then(response => {
        setUsers(response.map(user => {
          if (user.id === teamLeader.id) {
            return {id: user.id, label: user.email, roleType: 'LEADER'}
          }
          return (
            {id: user.id, label: user.email, roleType: 'MEMBER'}
          )
        })) 
      }).catch(error => {
        console.log(error)
      })
  }, [teamLeader])

  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>팀 관리</Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Card sx={ModalStyle()}>
          팀 관리
          <div>
            팀장
            {teamLeader.email}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              console.log(event)
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              getOptionDisabled={(option) =>
                option.roleType === 'LEADER'
              }
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="User"/>}
            />
            <Button
              type="submit"
            >
              추가
            </Button>
          </form>
          {currentTeam}
        </Card>
      </Modal>
    </Grid>
  );
};

export default ManageTeam;