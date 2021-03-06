import { Avatar, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAttendersByMeetingId, getMeesagesByMeetingId, getMessages } from "../../util/APIUtils"

export function MeetingResult() {
  const { state } = useLocation()
  const meeting = state.meeting
  const [ attenders, setAttenders ] = useState([])
  const [ message, setMessage ] = useState("")
  const startTime = meeting.startTime
  const endTime = meeting.endTime
  
  function getYear(time) { return Number(time.slice(0, 4))}
  function getMonth(time) { return Number(time.slice(5, 7))}
  function getDay(time) { return Number(time.slice(8, 10))}
  function getHour(time) { return (time.slice(11, 13))}
  function getMinute(time) { return (time.slice(14, 16))}
  function getColor(color) {
    switch (color) {
      case 'RED':
        return '#CC0000'
      case 'GREEN':
        return '#66CC00'
      case 'BLUE':
        return '#0000CC'
      case 'WHITE':
        return '#EBEBEB'
      case 'BLACK':
        return '#424242'
      case 'YELLOW':
        return '#FFFF66'
      default:
        return '#7b7cc2'
    }
  }

  useEffect(() => {
    getAttendersByMeetingId(meeting.id)
    .then(response => {
      setAttenders(response.data.map(attender => {
        const color = getColor(attender.hat_color)
        return (
          <CardHeader
            key={attender.id}
            avatar = {
              <Avatar
                alt={attender.user.name}
                src={attender.user.imageUrl}
              />}
            title={attender.user.name}
            subheader={attender.user.email}
            sx = {{
              color: color
            }}
          />
        )}
    ))}).catch(error => {
      console.log(error)
    })
  }, [meeting])
  
  useEffect(() => {
    getMeesagesByMeetingId(meeting.id)
    .then(response => {
      setMessage(response.data.map(message => {
        return (
          <TableRow
            key={message.id}
          >
            <TableCell>{message.user.name}</TableCell>
            <TableCell align="center">{message.content}</TableCell>
            <TableCell align="right">{getHour(message.send_time)}:{getMinute(message.send_time)}</TableCell>
          </TableRow>
        )
      }))
    }).catch(error => {
      console.log(error)
    })
  }, [meeting])

  return (
    <Card
      sx={{
        mt: 10,
        mx: 'auto',
        p: 5,
        width: '70%',
      }}
    >
      <CardHeader title={meeting.topic}/>
      <CardContent>
        <Typography>
          ?????? ?????? : {meeting.meetingType ? "????????????" : "??????" } 
        </Typography>
        <br/>
        <Typography>
          ?????? ?????? : {getYear(startTime)}??? {getMonth(startTime)}??? {getDay(startTime)}???
        </Typography>
        <br/>
        <Typography>
          ?????? ?????? : {getHour(startTime)}:{getMinute(startTime)}
        </Typography>
        <br/>
        <Typography>
          ?????? ?????? : {getHour(endTime)}:{getMinute(endTime)}
        </Typography>
        <br/>
        <Typography>
          ?????????
        </Typography>
        {attenders}
        <br/>
        <Typography>
          ???????????? ??????
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>??????</TableCell>
                  <TableCell align="center">????????????</TableCell>
                  <TableCell align="right">?????? ??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {message}
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
      </CardContent>
    </Card>
  )
}
