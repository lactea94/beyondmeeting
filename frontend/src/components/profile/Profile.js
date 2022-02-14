import { Grid } from '@mui/material';
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
  // css 좌측 길게 / 우측 상단 / 우측 하단 3파트로 나눠서 분류 (우측 하단이 중요(그래프 화))
  return (
  <Grid container columnSpacing={1}>
    <Info userName={userName} userEmail={userEmail} userImg={userImg}></Info>
    {TimeLog()}
  </Grid>
  )
};