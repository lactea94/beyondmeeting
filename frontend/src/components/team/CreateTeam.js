import { useState } from 'react';
import {
  Grid,
  Button,
  Modal,
  TextField,
  Card,
} from '@mui/material'
import { createTeam } from '../../util/APIUtils';
import { ModalStyle } from './ModalStyle';

function CreateTeam(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamName, setTeamName] = useState('');

  const handleChange = ({ target: {value} }) => setTeamName(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    createTeam({teamName: teamName});
    setTeamName('');
    setOpen(false);
    props.setReload(true);
  };
  
  const handelKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

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
              onSubmit={handleSubmit}
              onKeyUp={handelKeyPress}
              spacing={2}
              justifyContent="center"
              alignItems="center"
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