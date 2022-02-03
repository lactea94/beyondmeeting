package com.beyondmeeting.backend.team;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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
}
