import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

export function MeetingResult() {
  const { state } = useLocation()
  const meeting = state.meeting
  return (
    <Card
      sx={{
        m: 'auto',
        pb: 10,
        height: '50rem',
        width: '50%',
      }}
    >
      <CardHeader title={meeting.topic}/>
      <CardContent>
        <Typography>
          회의 종류 : 
          {meeting.meetingType ? "육색모자" : "일반" } 
        </Typography>
        <Typography>
          {meeting.startTime}
        </Typography>
        <Typography>
          {meeting.endTime}
        </Typography>
      </CardContent>
    </Card>
  )
}
