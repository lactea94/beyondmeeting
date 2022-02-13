import * as React from 'react';
import Paper from '@mui/material/Paper';
import { PieChart } from 'react-minimal-pie-chart';
import { Card, Grid } from '@mui/material';
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

  <div className='chart-color'>
    <PieChart
      data={[
        { title: 'Red', value: 10, color: '#793c3c' },
        { title: 'Blue', value: 15, color: '#424282' },
        { title: 'White', value: 20, color: '#808080' },
        { title: 'Yellow', value: 25, color: '#828242'},
        { title: 'Green', value: 25, color: '#426242'},
        { title: 'Black', value: 25, color: '#424242'},
      ]}
    />;
  </div>
  
  // <div className='chart-color'>
  //   <PieChart
  //     data={[
  //       { title: 'Red', value: 10, color: '#CC0000' },
  //       { title: 'Blue', value: 15, color: '#0000CC' },
  //       { title: 'White', value: 20, color: '#FFFFFF' },
  //       { title: 'Yellow', value: 25, color: '#FFFF66'},
  //       { title: 'Green', value: 25, color: '#66CC00 '},
  //       { title: 'Black', value: 25, color: '#424242'},
  //     ]}
  //   />;
  // </div>
);

export default Piechart;