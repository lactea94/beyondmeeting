import { useState } from 'react';
import {
  Grid,
  Button,
  Modal,
  TextField,
  Card,
} from '@mui/material'
import ModalStyle from '../ModalStyle';
import { createTeam } from '../../../../util/APIUtils';

function CreateTeam() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamName, setTeamName] = useState('');
  const handleChange = ({ target: {value} }) => setTeamName(value);
  const handleSubmit = (event) => {
    event.preventDefault();
    createTeam({ teamName: teamName });
    alert(`팀 생성 : ${teamName}`);
    setTeamName('');
    setOpen(false)  };


  // useEffect(() => {
  //   getUsers()
  //   .then(response => {
  //     setUsers(response)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }, [])

  // users.sort((a, b) => {
  //   return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
  // })
  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>팀 생성</Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Card
          sx={ModalStyle()}
          >
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>팀 생성</Grid>
            <Grid item container
              component="form"
              // onSubmit={handleSubmit}
            >
              <Grid item>
                <TextField
                  label="팀 이름"
                  name="teamName"
                  value={teamName}
                  size="small"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  생성
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </Grid>
  );
};

export default CreateTeam;