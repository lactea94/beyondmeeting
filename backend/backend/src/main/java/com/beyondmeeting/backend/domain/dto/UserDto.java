package com.beyondmeeting.backend.domain.dto;

import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.login.model.AuthProvider;
import com.beyondmeeting.backend.login.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String userName;
    private String userEmail;
    private String userImage;

    private List<Long> teamIdList;
    private List<Long> meetingIdList;


//    public UserDto(User user, List<UserHasTeam> teamIdList, List<UserHasMeeting> meetingIdList) {
//        this.id = user.getId();
//        this.userName = user.getName();
//        this.userEmail = user.getEmail();
//        this.userImage = user.getImageUrl();
//        this.teamIdList = teamIdList;
//        this.meetingIdList = meetingIdList;
//    }

//    public UserDto(User user, List<UserHasTeam> byTeamList) {
//        this.id = user.getId();
//        this.userName = user.getName();
//        this.userEmail = user.getEmail();
//        this.userImage = user.getImageUrl();
////        this.emailVerified = user.getEmailVerified();
////        this.password = user.getPassword();
////        this.provider = user.getProvider();
////        this.providerId = user.getProviderId();
//        this.teamIdList = byTeamList;
//
//    }

}
