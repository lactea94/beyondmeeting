import { useState } from "react";
import { Grid } from '@mui/material';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Info(props) {
  // const [user, setUser] = useState('');
  // const [userName, setUserName] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // const [userImg, setUserImg] = useState(''); // false는 유저 이미지를 가져왔더니 이미지가 기본 상태
  const { state } = useLocation();
  return (
    <Grid item container xs={2}>
      <Grid item xs={12}>
        <div className="sticky-info profile-container">
          <div className="container">
            <div className="profile-info">
              <div className="profile-avatar">
                { props.userImg ? (
                  <div className="">
                    <img src={props.userImg} alt="" />
                  </div>
                ) : (
                  <div className="text-avatar">
                    <span>Avatar</span>
                  </div>
                )
                }
                <Grid item xs={12}>
                  <h5 className="info-text1">name : {props.userName}</h5>
                  <h5 className="info-text2">email : {props.userEmail}</h5>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}