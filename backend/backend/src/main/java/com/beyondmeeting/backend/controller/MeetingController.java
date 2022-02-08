package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.Meeting;
import com.beyondmeeting.backend.domain.MeetingType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeetingController {

    @GetMapping("/meeting")
    public Meeting getMeetings(){
        Meeting meeting = new Meeting("오늘의 맛집", MeetingType.NORMAL);
        return meeting;
    }
    /*
    회의생성시
회의이름을 현재시간+팀이름으로 생성
post 방식으로 /meeting
     */
}
