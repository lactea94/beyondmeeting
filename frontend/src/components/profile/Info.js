import { useState } from "react";
import { Grid } from '@mui/material';
import { getCurrentUser } from "../../util/APIUtils";
import { useEffect } from "react";

export default function Info() {
  const [userImg, setUserImg] = useState(''); // false는 유저 이미지를 가져왔더니 이미지가 기본 상태
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // };

  // function loadCurrentlyLoggedInUser() {
  //   getCurrentUser()
  //   .then(response => {
  //     setUserName(response.name)
  //     setUserEmail(response.email)
  //     // setUserImg(response.)
  //   })
  // }

  useEffect(() => {
    getCurrentUser()
    .then(response => {
      setUserName(response.name)
      setUserEmail(response.email)
      setUserImg(response.imageUrl)
    });
  }, [])

  return (
    <Grid item container xs={2}>
      <Grid item xs={12}>
        <div className="profile-container">
          <div className="container">
            <div className="profile-info">
              <div className="profile-avatar">
                { userImg ? (
                  <div className="">
                    <img src={userImg} alt="" />
                  </div>
                ) : (
                  <div className="text-avatar">
                    <span>Avatar</span>
                  </div>
                )
                }
                <Grid item xs={12} className="userInfo">
                  <h3>name : {userName}</h3>
                  <h3>email : {userEmail}</h3>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}