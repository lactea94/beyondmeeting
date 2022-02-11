import React from 'react';
import { Grid } from '@mui/material/'
import styled from 'styled-components'

const Theme = styled.div`
  text-align: "center";
  font-size: 18px;
  height: 10%;

  @media only screen and (max-width: 900px) {
    font-size: 12px;
  }
`

const MainFunc = styled.div`
  height: 80%;
`

const BottomBar = styled.div`
  text-align: "center";
  font-size: 18px;
  height: 10%;

  @media only screen and (max-width: 900px) {
    font-size: 12px;
  }
`

export const Meetingroom = () => {
  return (
    <Grid container>
      <Theme item xs={12}>
        회의 주제
      </Theme>

      <Grid item xs={12}>
        <MainFunc>회의 주요 기능</MainFunc>
      </Grid>
      <Grid item xs={12}>
        <BottomBar>
          메뉴바
        </BottomBar>
      </Grid>
    </Grid>
    );
};

