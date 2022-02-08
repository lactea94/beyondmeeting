package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.RoleType;
import com.beyondmeeting.backend.domain.Team;
import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.domain.dto.TeamDto;
import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.model.User;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.login.security.CurrentUser;
import com.beyondmeeting.backend.login.security.UserPrincipal;
import com.beyondmeeting.backend.repository.TeamRepository;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import com.beyondmeeting.backend.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Lazy
@RequiredArgsConstructor
@RestController
public class TeamConroller {

    private final TeamRepository teamRepository;
    private final UserHasTeamRepository userHasTeamRepository;
    private final UserRepository userRepository;
    private final TeamService teamService;

    // ------------------------------------ CREATE ---------------------------------------
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

    // 팀원추가 - success
    @PostMapping("/team/member")
    public UserHasTeam createTeamMember( @RequestBody UserHasTeamDto userHasTeamDto){

        Team team = teamRepository.findById(userHasTeamDto.getTeam()).get();
        User user = userRepository.findById(userHasTeamDto.getUser()).get();
        UserHasTeam userHasTeam = new UserHasTeam(user, team, userHasTeamDto.getRoleType());

        return userHasTeamRepository.save(userHasTeam);

    }

    // ------------------------------------ READ ---------------------------------------

    // 팀조회
    @GetMapping("/teams")
    public List<Team> getTeam(){
        return teamRepository.findAll();
    }

    // 팀원조회 - success
    // id : 팀 id로 팀접근해서 구성원 찾기
    @GetMapping("/team/member/{teamId}")
    public List getTeamUsers(@PathVariable Long teamId){
        Team team = teamRepository.findById(teamId).get();

        return team.getUserHasTeamList();
    }

    // ------------------------------------ UPDATE ---------------------------------------
    // 팀정보 수정


    // 팀장수정 - success
    // 팀 Id를 받고, 팀장이 될 사람의 userHasTeamDto Body에 바꿀내용 보내기
    @PutMapping("/team/leader/{teamId}")
    public Team updateTeam(@PathVariable Team teamId, @RequestBody UserHasTeamDto userHasTeamDto){
        return teamService.update(teamId,userHasTeamDto);
    }

    // ------------------------------------ DELETE ---------------------------------------
    // 추후에 데이터 삭제하지 않고 flag 처리 ..

    //팀삭제
    @DeleteMapping("/team/{teamId}")
    public String deleteTeam(@PathVariable Long teamId) {
        String teamName = teamRepository.findById(teamId).get().getTeamName();
        teamRepository.deleteById(teamId);
        return teamName;
    }

    // 팀원삭제
    @DeleteMapping("/team/member/{teamId}/{userId}")
    public String deleteMember(@PathVariable Long teamId,@PathVariable Long userId){
        // userHasTeam 에서 찾기
        Team team = teamRepository.findById(teamId).get();
        User user = userRepository.findById(userId).get();
        
        UserHasTeam userHasTeam = userHasTeamRepository.findAllByTeamAndUser(team,user);
        if(userHasTeam.getRoleType() == RoleType.MEMBER){
            Long userHasTeamId = userHasTeam.getId();
            userHasTeamRepository.deleteById(userHasTeamId);
            return user.getName();
        }
        else return "팀장은 삭제 불가";

    }

}
