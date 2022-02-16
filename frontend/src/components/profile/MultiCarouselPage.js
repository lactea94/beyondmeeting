import React from 'react';
import { Grid, Button } from '@mui/material';
import LineChart from './LineChart';
import Piechart from './PieChart';

export default function MultiCarouselPage(props) {
  const hatTime = props.hatTime
  
  const items = [
  {
    name: "모자 별 시간",
    description: "원그래프!",
    graph: <Piechart hatTime={hatTime}></Piechart>,
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
      <Grid>
        <h2 className='font-color'>{props.item.name}</h2>
        <p className='font-color'>{props.item.description}</p>
        {props.item.graph}

        <Button className="CheckButton">
          Check it out!
        </Button>
      </Grid>
      )
  }

  return (
    <Grid item container xs={12} spacing={5}>
      <Grid item xs={6}>
        <h2 className='font-color kkwak-kkye'>모자 별 시간</h2>
          <p className='font-color kkwak-kkye'>원그래프!</p>
        <div className='kkwak-kkye'>
          <Piechart hatTime={hatTime}></Piechart>
        </div>
        <div className='kkwak-kkye'>
        <Button className="CheckButton">
          Check it out!
        </Button>
        </div>
      </Grid>
      <Grid item xs={5.5}>
        <h2 className='font-color'>총 회의 횟수 : n회</h2>
        <p className='font-color'>꺾은선 그래프!</p>
        <LineChart></LineChart>
        <Button className="CheckButton">
          Check it out!
        </Button>
      </Grid>
      {/* <Grid item xs={6}>
        {
          items.map( (item, i) => <Item key={i} item={item} /> )
        }
      </Grid> */}
    </Grid>
  )
}
