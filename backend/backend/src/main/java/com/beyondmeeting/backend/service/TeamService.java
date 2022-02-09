package com.beyondmeeting.backend.service;

import com.beyondmeeting.backend.domain.RoleType;
import com.beyondmeeting.backend.domain.Team;
import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.model.User;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class TeamService {

    private final UserHasTeamRepository userHasTeamRepository;
    private final UserRepository userRepository;

   @Transactional
    public Team update(Team team, UserHasTeamDto userHasTeamDto) {

        UserHasTeam userHasTeamFrom = userHasTeamRepository.findAllByTeamAndRoleType(team, RoleType.LEADER);
        userHasTeamFrom.update(RoleType.MEMBER);

        User user = userRepository.findById(userHasTeamDto.getUser()).get();
        UserHasTeam userHasTeamTo = userHasTeamRepository.findAllByTeamAndUser(team,user);
        userHasTeamTo.update(userHasTeamDto);

        return team;
    }
}
