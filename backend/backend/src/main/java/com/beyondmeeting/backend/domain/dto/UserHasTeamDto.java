package com.beyondmeeting.backend.domain.dto;

import com.beyondmeeting.backend.domain.RoleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserHasTeamDto {
    private Long team;
    private Long user;
    private RoleType roleType;
}
