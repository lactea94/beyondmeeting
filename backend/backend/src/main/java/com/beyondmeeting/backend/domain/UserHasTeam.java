package com.beyondmeeting.backend.domain;

import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserHasTeam {

    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 팀장인지
    private Boolean role;

    public UserHasTeam(Team team, User user, Boolean role) {
        this.team = team;
        this.user = user;
        this.role = role;
    }

//    public UserHasTeam(UserHasTeamDto userHasTeamDto) {
//        //추가ㅏㅏㅏ
//        this.team = userHasTeamDto.getTeam();
//        this.user = userHasTeamDto.getUser();
//        this.role = userHasTeamDto.getRole();
//    }

//    // 변동가능한게 userid,role
//    public void update(UserHasTeamDto userHasTeamDto) {
//        this.user = userHasTeamDto.getUser();
//        this.role = userHasTeamDto.getRole();
//    }
//
//    public UserHasTeam(UserHasTeamDto userHasTeamDto){
//        this.team = userHasTeamDto.getTeam();
//        this.user = userHasTeamDto.getUser();
//        this.role = userHasTeamDto.getRole();
//    }
}