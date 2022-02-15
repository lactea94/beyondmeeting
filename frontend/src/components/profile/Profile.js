import TimeLog from './TimeLog'
import Info from './Info'
import './Profile.css';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../util/APIUtils';
import LoadingIndicator from '../../common/LoadingIndicator';
import { Grid } from '@mui/material';


export function Profile() {
  const [user, setUser] = useState('');
  const [userHasMeetingList, setUserHasMeetingList] = useState('');
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   if (userId)
  //     getOneUser(userId)
  //     .then(response => {
  //       setUser(response)
  //       const num = (response.userHasMeetingList).length
  //       let sum = 0;
  //       for (let i = 0; i < num; i++) {
  //         let end = new Date(response.userHasMeetingList[i].meeting.endTime)
  //         let start = new Date(response.userHasMeetingList[i].meeting.startTime)
  //         let diff = (end.getTime() - start.getTime())
  //         sum = sum + diff;
  //       }
  //       console.log(sum)
  //     }).catch(error => {
  //       console.log(error)
  //     });
  // }, [userId]);

    // if(loading) 
    //   <LoadingIndicator></LoadingIndicator>
  useEffect(() => {
    getCurrentUser()
    .then(response => {
      setUser(response)
      setUserHasMeetingList(user.userHasMeetingList)
      // setLoading(false)
      console.log(response)
    }).catch(error => {
      console.log(error)
      // setLoading(false)
    });
  }, []);

  useEffect(() => {

  },[user]);


  return (
  <Grid container columnSpacing={5}>
    <Info user={user}></Info>
    <TimeLog user={user} userHasMeetingList={userHasMeetingList}></TimeLog>
  </Grid>
  )
};