package com.beyondmeeting.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//setter 는 지양.. 이유는?! 찾아볼것
@Getter
@Entity
@NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;    // sql에서는 bigint

    @Column(nullable = false)
    private String teamName;

    public Team(Long id, String teamName) {
        this.id = id;
        this.teamName = teamName;
    }

    // userHasTeam 의 team
    @OneToMany(mappedBy = "team")
    private List<UserHasTeam> userHasTeamList = new ArrayList<>();
}
