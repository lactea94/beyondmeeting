package com.beyondmeeting.backend.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserHasTeamDto {
    private Long team;
    private Long user;
    private Boolean role;
}
