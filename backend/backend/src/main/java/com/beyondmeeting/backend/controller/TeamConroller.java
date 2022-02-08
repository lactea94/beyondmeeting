package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.RoleType;
import com.beyondmeeting.backend.domain.Team;
import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.domain.dto.TeamDto;
import com.beyondmeeting.backend.domain.dto.UserDto;
import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.exception.ResourceNotFoundException;
import com.beyondmeeting.backend.login.model.User;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.login.security.CurrentUser;
import com.beyondmeeting.backend.login.security.UserPrincipal;
import com.beyondmeeting.backend.repository.TeamRepository;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import com.beyondmeeting.backend.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TeamConroller {

    private final TeamRepository teamRepository;
    private final UserHasTeamRepository userHasTeamRepository;
    private final UserRepository userRepository;
    private final TeamService teamService;

    // 팀추가 - success
    // 로그인만 테스트남음
    @PostMapping("/team")
    public UserHasTeam createTeam(@RequestBody TeamDto teamDto,@CurrentUser UserPrincipal userPrincipal){
        Team team = new Team(teamDto);

        // 로그인된사람이 팀장
        //User user = userRepository.findById(userPrincipal.getId()).get();
        //UserHasTeam userHasTeam = new UserHasTeam(user,team,RoleType.LEADER);
        // 팀장은 한명만?
        /*
        팀생성하면 무조건 팀장
팀원추가되면 팀원
팀장 변경을 위해선
팀장이 될사람이 팀원인지 확인하고
팀장이 팀장인지 확인하고
팀원이 팀장 되고
팀장이 팀원 된다
역할 추가 가능성 때문에 int형으로 하기
         */

        // 일단 테스트용으로 user 아무거나
        User user = userRepository.findById(1L).get();

        UserHasTeam userHasTeam = new UserHasTeam(user,team,RoleType.LEADER);
        teamRepository.save(team);

        // userHasTeamList 추가
        team.getUserHasTeamList().add(userHasTeam);

        return userHasTeamRepository.save(userHasTeam);
    }

    // 팀원조회 - success
    // id : 팀 id로 팀접근해서 구성원 찾기
    @GetMapping("/team/member/{id}")
    public List getTeamUsers(@PathVariable Long id){
        Team team = teamRepository.findById(id).get();

        return team.getUserHasTeamList();
    }

    // 팀원추가 - success
    @PostMapping("/team/member")
    public UserHasTeam createTeamMember( @RequestBody UserHasTeamDto userHasTeamDto){

        Team team = teamRepository.findById(userHasTeamDto.getTeam()).get();
        User user = userRepository.findById(userHasTeamDto.getUser()).get();
        UserHasTeam userHasTeam = new UserHasTeam(user, team, userHasTeamDto.getRoleType());

        return userHasTeamRepository.save(userHasTeam);

    }


    //팀장수정 - userHasTeam repo 가 변경되어야함
    // 팀장의 userId를 받고, body에 userHasTeam팀장이 될 userId를
//    @PutMapping("/team/member/leader/{id}")
//    public Long updateTeam(@PathVariable Long id, @RequestBody UserHasTeamDto userHasTeamDto){
//        return teamService.
//        // return
//    }

    @GetMapping("/team")
    public List<Team> getTeam(){
        return teamRepository.findAll();
    }

    //cascade 추가할것.. flag 처리 .. transaction
    @DeleteMapping("/team/{id}")
    public String deleteTeam(@PathVariable Long id) {
        String teamName = teamRepository.findById(id).get().getTeamName();
        teamRepository.deleteById(id);
        return teamName;
    }



}
