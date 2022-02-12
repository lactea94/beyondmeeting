import { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
} from '@mui/material'
import ModalStyle from './ModalStyle';
import { getUsers } from '../../../util/APIUtils';

function CreateTeam() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addUser, setAddUser] = useState([])

  function onRemove (id) {
    setAddUser(addUser.filter(user => user.id !== id))
  }
  
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getUsers()
    .then(response => {
      setUsers(response)
    })
  }, [])

  const userList = users.map((user) => {
    const id = user.id
    return (
      <MenuItem
        key={id}
        value={user}
      >{user.email}</MenuItem>
    )
  })

  const handelChange = (event) => {
    setUser(event.target.value);
  };
  
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
                setAddUser([...addUser, user])
              }}
            >
              <Grid item>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label="사용자"
                  name="user"
                  onChange={handelChange}
                >
                  <MenuItem value="">None</MenuItem>
                  {userList}  
                </Select>
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
                    {addUser.map((user) => (
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