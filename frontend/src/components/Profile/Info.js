import { useState } from "react";
import { Grid } from '@mui/material';

export default function Info() {
  const [userImg, setUserImg] = useState(false); // false는 유저 이미지를 가져왔더니 이미지가 기본 상태
  const username = 'park';// props써야지
  const userEmail = 'pjyc17@gmail.com'; //props 써야지
  const user = {
    name: username,
    email: userEmail,
  };

  return (
    <Grid item container xs={3}>
      <Grid item xs={12}>
        { userImg ? (
          <h1>YOUR IMG IS HERE</h1>
        ) : (
          <div className="text-avatar">
            <span>Avatar</span>
          </div>
        )
        }
        <Grid item xs={12} className="userInfo">
          <h3>name : {user.name}</h3>
          <h3>email : {user.email}</h3>
        </Grid>
      </Grid>
    </Grid>
  )
}