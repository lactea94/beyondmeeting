package com.beyondmeeting.backend.service;

import com.beyondmeeting.backend.domain.Team;
import com.beyondmeeting.backend.domain.dto.TeamDto;
import com.beyondmeeting.backend.repository.TeamRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TeamService {

    private final TeamRepository teamRepository;

//    public Long update(Long id, TeamDto teamDto){
//        Team team1 = teamRepository.findById(id).orElseThrow(
//                () -> new IllegalArgumentException("해당 user가 존재하지 않습니다.")
//        );
//        team1.update(teamDto);
//        return team1.getId();
//    }

}
