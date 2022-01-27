package com.beyondmeeting.backend.team;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamConroller {

    @GetMapping("/team")
    public Team getTeams(){
        Team team = new Team(1L,"1이커지조");

        return team;
    }

}
