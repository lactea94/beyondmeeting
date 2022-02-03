import { Grid } from '@mui/material';
import TimeLog from './TimeLog'
import Info from './Info'
import './Profile.css';
// https://studiomeal.com/archives/533
export function Profile() {

  // css 좌측 길게 / 우측 상단 / 우측 하단 3파트로 나눠서 분류 (우측 하단이 중요(그래프 화))
  return (
  <Grid container columnSpacing={1}>
    {Info()}
    {TimeLog()}
  </Grid>
  )
};