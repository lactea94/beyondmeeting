import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export function Team() {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={4}>팀 목록</Grid>
      <Grid item xs={8}>팀 명</Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            width: '100%',
            height: '50rem',
            backgroundColor: 'primary.dark',
          }}
        >
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box
          display='grid'
          gap={2}
          sx={{
            width: '100%',
            height: '50rem',
            backgroundColor: 'primary.dark',
          }}
        >
          
          <Box
            sx={{
              width: '50%',
              height: '10rem',
              backgroundColor: 'primary.main',
            }}
          ></Box>
        </Box>
      </Grid>
    </Grid>
  );
}