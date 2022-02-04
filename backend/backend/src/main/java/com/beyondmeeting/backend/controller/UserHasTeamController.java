package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import com.beyondmeeting.backend.service.UserHasTeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserHasTeamController {

    private final UserHasTeamRepository userHasTeamRepository;
    private final UserHasTeamService userHasTeamService;

    @PostMapping("/team/member")
    public UserHasTeam createParticipation(@RequestBody UserHasTeamDto userHasTeamDto){
        UserHasTeam userHasTeam = new UserHasTeam(userHasTeamDto);
        return userHasTeamRepository.save(userHasTeam);
    }

    @GetMapping("/team")
    public List<UserHasTeam> getUserHasTeam(){
        return userHasTeamRepository.findAll();
    }
}
