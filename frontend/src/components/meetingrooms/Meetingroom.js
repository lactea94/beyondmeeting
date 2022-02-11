import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'


export const Meetingroom = () => {
  var member = 6;

  const totalBox = {
    my : 1/2,
  };

  return (
    <Grid container direction="column" spacing={2} sx={totalBox}>
      <Grid item textAlign="center">
        회의목표
      </Grid>
      <Grid item container className='meetingbox' spacing={2}>
        <Grid item container xs={2} direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Box>
              모자걸이
            </Box>
          </Grid>
          <Grid Item>
            <Box>
              상세정보
            </Box>
          </Grid>
        </Grid>
        <Grid item container xs={7}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} className="facegrid">
              <Box className="face">화면</Box>
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={3} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={5}>
            <Box textAlign="center">
              참여자
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box textAlign="center">
              아이디어보드
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={2} textAlign="center">
          imoge
        </Grid>
        <Grid item xs={2} textAlign="center">
          음소거
        </Grid>
        <Grid item xs={2} textAlign="center"> 
          화면공유
        </Grid>
        <Grid item xs={2} textAlign="center">
          회의 종료
        </Grid>
        <Grid item xs={2} textAlign="center">
          주제
        </Grid>
        <Grid item xs={2} textAlign="center">
          채팅
        </Grid>
      </Grid>
    </Grid>
    );
};

