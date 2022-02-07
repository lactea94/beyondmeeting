import React from 'react';
import { Grid, Button, Modal, Card } from '@mui/material'
import ModalStyle from './ModalStyle';

function CreateMeeting() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>회의 생성</Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Card sx={ModalStyle()}>
          회의 생성
        </Card>
      </Modal>
    </Grid>
  );
};

export default CreateMeeting;