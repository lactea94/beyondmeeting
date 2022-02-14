import { useState } from 'react';
import {
  Grid,
  Button,
  Modal,
  TextField,
  Card,
} from '@mui/material'
import { createTeam } from '../../util/APIUtils';
import { FRONT_BASE_URL } from '../../constants';

function CreateTeam() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamName, setTeamName] = useState('');

  const handleChange = ({ target: {value} }) => setTeamName(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    createTeam({teamName: teamName});
    setTeamName('');
    setOpen(false)
    window.location.href = FRONT_BASE_URL + '/team'
  };
  
  const handelKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>팀 생성</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>팀 생성</Grid>
            <Grid item container
              component="form"
              onSubmit={handleSubmit}
              onKeyUp={handelKeyPress}
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