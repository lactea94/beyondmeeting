import React from 'react';
import { Grid, Button, Modal, Card } from '@mui/material'

function CreateMeeting() {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

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
        <Card sx={modalStyle}>
          회의 생성
        </Card>
      </Modal>
    </Grid>
  );
};

export default CreateMeeting;