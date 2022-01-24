import { useState } from "react"

export function Profile() {
  const [userImg, setUserImg] = useState(false) // false는 유저 이미지를 가져왔더니 이미지가 기본 상태
  const username = 'park'
  return (
    <div className="profile-container">
      <div>
        { userImg ? (
          <h1 className="profile-info">YOUR IMG IS HERE</h1>
        ) : (
          <div className="profRoundImg">
            <img src="img/그림1.png" alt="우왕" />
          </div>
        )
        }
      </div>
      <h1>user's name : {username}</h1>
    </div>
  )
};