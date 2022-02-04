import React from 'react';
import {
  Grid,
  Button,
  Modal,
  Card,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox
} from '@mui/material'

function CreateTeam() {
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
  const userList = ['dannyp0930@gmail.com', 'dannyp0930@daum.net', 'dannyp95@naver.com']

  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>팀 생성</Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Card sx={modalStyle}>
          <h3>팀 생성</h3>
          <hr></hr>
          <TextField label="이름" variant="outlined" />
          <br></br>
          <br></br>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableBody>
                {userList.map((user) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{user}</TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        // inputProps={{
                        //   'aria-labelledby': labelId,
                        // }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <br></br>
          <Button>생성</Button>
        </Card>
      </Modal>
    </Grid>
  );
};

export default CreateTeam;