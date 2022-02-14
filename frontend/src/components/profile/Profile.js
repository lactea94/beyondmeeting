import { formControlUnstyledClasses, Grid } from '@mui/material';
import TimeLog from './TimeLog'
import Info from './Info'
import './Profile.css';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../util/APIUtils';


export function Profile() {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImg, setUserImg] = useState(''); 
  const [userHasMeetingList, setUserHasMeetingList] = useState('');

  useEffect(() => {
    getCurrentUser()
    .then(response => {
      setUser(response)
      setUserName(response.userName)
      setUserEmail(response.userEmail)
      setUserImg(response.userImage)
      console.log(response)
    }).catch(error => {
      console.log(error)
    });
  }, []);
  useEffect(() => {
    if (user)
      setUserHasMeetingList(user.userHasMeetingList)
      console.log(userHasMeetingList)
  })

  // useEffect(() => {
  //   if (user)
  //   setUserHasMeetingList(user.userHasMeetingList)
  //   .then(response)
  //     console.log(userHasMeetingList)
  //   }).catch((error => {
  //     console.log(error)
  //   });

  // },[user]);
  
  return (
  <Grid container columnSpacing={5}>
    <Info userName={userName} userEmail={userEmail} userImg={userImg}></Info>
    {TimeLog()}
  </Grid>
  )
};