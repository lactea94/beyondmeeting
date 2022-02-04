import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { styled }  from '@mui/material/styles';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import "./Meetingroom.css"

const Item = styled(Paper) (({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}))

export const Meetingroom = () => {
  return (
    <Grid direction={"row"} container className='meetingbox'>
      <Grid item container xs={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <Item>
            모자걸이
          </Item>
        </Grid>
        <Grid Item>
          <Item>
            상세정보
          </Item>
        </Grid>
      </Grid>
      <Grid item container xs={7} spacing={10}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index} className="facegrid">
            <Item className="face">화면</Item>
          </Grid>
        ))}
      </Grid>
      <Grid item container xs={3} direction="column" justifyContent="center" alignItems="center">
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
    );
};

