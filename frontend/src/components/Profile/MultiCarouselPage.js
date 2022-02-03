import React from 'react';
import { Grid, Paper, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import LineChart from './LineChart';
import PieChart from './PieChart';

export default function MultiCarouselPage() {
  const items = [
  {
    name: "모자 별 시간",
    description: "원그래프!",
    graph: PieChart(),
  },
  {
    name: "총 회의 횟수 : n회",
    description: "꺾은선 그래프!",
    graph: LineChart(),
  },
]
  function Item(props)
  {
    return (
      <Paper>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>
        {props.item.graph}

        <Button className="CheckButton">
          Check it out!
        </Button>
      </Paper>
      )
  }

  return (
    <Grid item container xs={9} rowSpacing={5}>
      <Grid item xs={9}>
        <Carousel>
            {
              items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
      </Grid>
    </Grid>
  )
}
