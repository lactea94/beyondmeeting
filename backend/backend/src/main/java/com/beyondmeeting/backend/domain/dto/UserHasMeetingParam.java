package com.beyondmeeting.backend.domain.dto;

import com.beyondmeeting.backend.domain.HatColor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserHasMeetingParam {
    Long userId;
    HatColor hatColor;
    Long speakingTime;
    Long meetingId;
}
