package com.beyondmeeting.backend.service;

import com.beyondmeeting.backend.domain.UserHasTeam;
import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class UserHasTeamService {

    private final UserHasTeamRepository userHasTeamRepository;

    // team에서 user를 변경하기 위함
    @Transactional
    public Long update(Long id, UserHasTeamDto userHasTeamDto){
        UserHasTeam userHasTeam1 = userHasTeamRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 user가 존재하지 않습니다.")
        );
        userHasTeam1.update(userHasTeamDto);
        return userHasTeam1.getId();
    }
}
