import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const chartData = [
  { country: 'BLACKHAT', area: 12 },
  { country: 'YELLOWHAT', area: 7 },
  { country: 'REDHAT', area: 7 },
  { country: 'GREENHAT', area: 7 },
  { country: 'BLUEHAT', area: 6 },
  { country: 'WHITEHAT', area: 5 },
];
const PieChart = () => (

  <Paper>
    <Chart
      data={chartData}
    >
      <PieSeries
        valueField="area"
        argumentField="country"
      />
      <Title
        text="Area of Countries"
      />
      <Animation />
    </Chart>
  </Paper>
);

export default PieChart;