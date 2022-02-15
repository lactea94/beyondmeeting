import { Grid } from "@mui/material"
import { useLocation } from "react-router-dom"

export function MeetingResult() {
  const { state } = useLocation()
  const meeting = state.meeting
  return (
    <div>
      MeetingResult
      <Grid>
      {meeting.topic}
      </Grid>
      <Grid>
      {meeting.meetingType}
      </Grid>
      <Grid>
      {meeting.startTime}
      </Grid>
      <Grid>
      {meeting.endTime}
      </Grid>
    </div>
  )
}
