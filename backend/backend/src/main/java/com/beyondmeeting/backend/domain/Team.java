package com.beyondmeeting.backend.domain;

import com.beyondmeeting.backend.domain.dto.TeamDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;    // sql에서는 bigint

    @Column(nullable = false)
    private String teamName;

    // userHasTeam 의 team
    @JsonIgnore
    @OneToMany(mappedBy = "team")
    private List<UserHasTeam> userHasTeamList = new ArrayList<>();

    public Team(TeamDto teamDto){
        this.teamName = teamDto.getTeamName();
    }

    public Team(Long id){
        this.id = id;
    }



//    @OneToMany(mappedBy = "team")
//    private UserHasTeam userHasTeam;
}
