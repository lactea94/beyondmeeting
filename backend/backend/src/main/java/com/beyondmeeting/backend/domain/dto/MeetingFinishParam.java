package com.beyondmeeting.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingFinishParam {
    private Long meetingId;
    private List<Long> speakingTimeList = new ArrayList<>(); // UserId, SpeakingTime 저장
}
