import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
const data = [
  { argument: 0.5, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const LineChart =  () => (
  <Paper>
    <Chart
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />

      <LineSeries valueField="value" argumentField="argument" />
      <Animation />
    </Chart>
  </Paper>
);
export default LineChart;