package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.Team;
import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.domain.dto.TeamDto;
import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.model.User;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.repository.TeamRepository;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TeamConroller {

//    @GetMapping("/team")
//    public Team getTeams(){
//        Team team = new Team(1L,"1이커지조");
//
//        return team;
//    }

    private final TeamRepository teamRepository;
    private final UserHasTeamRepository userHasTeamRepository;
    private final UserRepository userRepository;
    // 팀추가
    @PostMapping("/team")
    public Team createTeam(@RequestBody TeamDto teamDto){
        Team team = new Team(teamDto);
        return teamRepository.save(team);
    }
    // 팀원조회
//    @GetMapping("/team/member")
//    public String createForm(Model model){
//        model.addAttribute("form",new UserHasTeam());
//        return "team/createUserHasTeamForm";
//    }

    // 팀원추가
    @PostMapping("/team/member")
    public UserHasTeam createTeamMember( @RequestBody UserHasTeamDto userHasTeamDto){

//        Team team = new Team(teamDto);
//        return teamRepository.save(team);

        Team team = teamRepository.findById(userHasTeamDto.getTeam()).get();
        User user = userRepository.findById(userHasTeamDto.getUser()).get();
        UserHasTeam userHasTeam = new UserHasTeam(team,user,userHasTeamDto.getRole());

        return userHasTeamRepository.save(userHasTeam);

    }

    //팀장수정 - userHasTeam repo 가 변경되어야함
//    @PutMapping("/team/member/{id}")
//    public Long updateTeam(@PathVariable Long id, @RequestBody UserHasTeamDto userHasTeamDto){
//       // return
//    }

    @GetMapping("/team")
    public List<Team> getTeam(){
        return teamRepository.findAll();
    }

    //cascade 추가할것..
    @DeleteMapping("/team/{id}")
    public Long deleteTeam(@PathVariable Long id) {
        teamRepository.deleteById(id);
        return id;
    }



}
