import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { styled }  from '@mui/material/styles';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Item = styled(Paper) (({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}))

export const Meetingroom = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="row" Spacing={1}>
        <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Item>
              모자걸이
            </Item>
          </Grid>
          <Grid item>
            <Item>
              상세정보
            </Item>
          </Grid>
        </Grid>
        <Grid container item xs={3} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>화면</Item>
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Item>
              회의 목표
            </Item>
          </Grid>
          <Grid item>
            <Item>
              아이디어보드
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    );
};

