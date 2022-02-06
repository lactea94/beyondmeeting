import { useState, useRef } from 'react';
import {
  Grid,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Card,
} from '@mui/material'
import ModalStyle from './ModalStyle';

function CreateTeam() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userList, setUserList] = useState([])
  const nextId = useRef(0)

  function onRemove (id) {
    setUserList(userList.filter(user => user.id !== id))
  }

  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>팀 생성</Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Card sx={ModalStyle()}>
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>팀 생성</Grid>
            <Grid item>
              <TextField label="이름" size="small" variant="outlined" />
            </Grid>
            <Grid item container
              component="form"
              onSubmit={function (event) {
                event.preventDefault()
                setUserList([...userList, { id: nextId.current, email: event.target.email.value}])
                nextId.current += 1
                event.target.email.value = ''
              }}
            >
              <Grid item>
                <TextField
                  label="이메일"
                  name="email"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                >
                  추가
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small">
                  <TableBody>
                    {userList.map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => onRemove(user.id)}
                          >삭제</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <Button variant="contained">생성</Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </Grid>
  );
};

export default CreateTeam;