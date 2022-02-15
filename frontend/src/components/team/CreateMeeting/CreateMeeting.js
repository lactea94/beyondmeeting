import {
  Grid,
  Button,
  Modal,
  Card,
  CardHeader,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActions,
  TextField
} from '@mui/material'
import { useState } from 'react';
import { createMeeting } from '../../../util/APIUtils';
import { ModalStyle } from '../ModalStyle';

function CreateMeeting(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [meetingName, setMeetingName] = useState('');
  const [type, setType] = useState('default');

  const handleChangeName = ({ target: {value} }) => setMeetingName(value);
  
  const handleChangeType = (event) => setType(event.target.value);
  
  const handleSubmit = (event) => {
    event.preventDefault()
    createMeeting(
      {
        topic: meetingName,
        meetingType: type,
        teamId: props.teamId
      }
      );
    setOpen(false);
    props.setReload(true);
  }

  return (
    <Grid item>
      <Button onClick={handleOpen} variant="contained" sx={{m:1}}>회의 생성</Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Card
          sx={ModalStyle()}
        >
          <form
            onSubmit={handleSubmit}
          >
            <CardHeader title="회의 생성">
            </CardHeader>
            <CardContent>
              <TextField
                required
                label="회의 이름"
                value={meetingName}
                onChange={handleChangeName}
              />
              <RadioGroup
                defaultValue="NORMAL"
                value={type}
                onChange={handleChangeType}
              >
                <FormControlLabel value="NORMAL" control={<Radio />} label="일반" />
                <FormControlLabel value="SIXHAT" control={<Radio />} label="6모자" />
              </RadioGroup>
            </CardContent>
            <CardActions>
              <Button size="small" type="submit">생성</Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    </Grid>
  );
};

export default CreateMeeting;