import * as React from 'react';
import Paper from '@mui/material/Paper';
import { PieChart } from 'react-minimal-pie-chart';
// import { Animation } from '@devexpress/dx-react-chart';

// const chartData = [
//   { country: 'BLACKHAT', area: 12 },
//   { country: 'YELLOWHAT', area: 7 },
//   { country: 'REDHAT', area: 7 },
//   { country: 'GREENHAT', area: 7 },
//   { country: 'BLUEHAT', area: 6 },
//   { country: 'WHITEHAT', area: 5 },
// ];
const Piechart = () => (

  <Paper>
    <PieChart
      data={[
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
      ]}
    />;
  </Paper>
);

export default Piechart;