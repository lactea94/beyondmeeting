import * as React from 'react';
import { useState, useEffect } from 'react';
// import { getCurrentUser, getAttenders } from '../../util/APIUtils';


import { PieChart } from 'react-minimal-pie-chart';
import Paper from '@mui/material/Paper';
import { Card, Grid } from '@mui/material';

export default function Piechart() {
  // const [user, setUser] = useState('');
  // const [userId, setUserId] = useState(null);
  // const [hat, setHat] = useState(null);
  
  
  // useEffect(() => {
  //   getCurrentUser()
  //   .then(response => {
  //     // console.log(response)
  //     setUserId(response.id)
  //   }).catch(error => {
  //     console.log(error)
  //   });
  // }, []);
  // useEffect(() => {
  //   if (userId)
  //     getOneUser(userId)
  //     .then(response => {
  //       setUser(response)
  //       console.log(response)

  //     }).catch(error => {
  //       console.log(error)
  //     });
  // }, [userId]);
  // useEffect(() => {
  //   if (user)
  //   getUserHasMeeting(user)
  // })
  return (
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
  )  
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
};