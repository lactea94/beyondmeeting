import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAttendersByMeetingId, getMeesagesByMeetingId } from "../../util/APIUtils"

export function MeetingResult() {
  const { state } = useLocation()
  const meeting = state.meeting
  const [ attenders, setAttenders ] = useState([])
  const [ message, setMessage ] = useState("")
  const startTime = meeting.startTime
  const endTime = meeting.endTime
  function getYear(str) { return Number(str.slice(0, 4))}
  function getMonth(str) { return Number(str.slice(5, 7))}
  function getDay(str) { return Number(str.slice(8, 10))}
  function getHour(str) { return Number(str.slice(11, 13))}
  function getMinute(str) { return Number(str.slice(14, 16))}
  function getSecond(str) { return Number(str.slice(17, 19))}

  useEffect(() => {
    getAttendersByMeetingId(meeting.id)
    .then(response => {
      setAttenders(response.data.map(attender => {
        return (
          <Typography
            key={attender.id}
          >
            <Avatar alt={attender.user.name} src={attender.user.imageUrl} />
            {attender.user.name} {attender.hat_color}
          </Typography>
        )
    }))}).catch(error => {
      console.log(error)
    })
  }, [meeting])
  
  useEffect(() => {
    getMeesagesByMeetingId(meeting.id)
    .then(response => {
      setMessage(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [meeting])

  return (
    <Card
      sx={{
        m: 'auto',
        pb: 10,
        width: '50%',
      }}
    >
      <CardHeader title={meeting.topic}/>
      <CardContent>
        <Typography>
          회의 종류 : {meeting.meetingType ? "육색모자" : "일반" } 
        </Typography>
        <br/>
        <Typography>
          회의 일자 : {getYear(startTime)}년 {getMonth(startTime)}월 {getDay(startTime)}일
        </Typography>
        <br/>
        <Typography>
          시작 시간 : {getHour(startTime)}:{getMinute(startTime)}:{getSecond(startTime)}
        </Typography>
        <br/>
        <Typography>
          종료 시간 : {getHour(endTime)}:{getMinute(endTime)}:{getSecond(endTime)}
        </Typography>
        <br/>
        <Typography>
          참여자
        </Typography>
        {attenders}
        <br/>
        <Typography>
          메시지
          {message}
        </Typography>
      </CardContent>
    </Card>
  )
}
