package com.beyondmeeting.backend.domain;

import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class UserHasTeam {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 팀장인지
    private String role;

    public UserHasTeam(Team team, User user, String role) {
        this.team = team;
        this.user = user;
        this.role = role;
    }

    // 변동가능한게 userid,role
    public void update(UserHasTeamDto userHasTeamDto) {
        this.user = userHasTeamDto.getUser();
        this.role = userHasTeamDto.getRole();
    }

    public UserHasTeam(UserHasTeamDto userHasTeamDto){
        this.team = userHasTeamDto.getTeam();
        this.user = userHasTeamDto.getUser();
        this.role = userHasTeamDto.getRole();
    }
}
