package com.beyondmeeting.backend.meeting;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeetingController {

    @GetMapping("/meeting")
    public Meeting getMeetings(){
        Meeting meeting = new Meeting("오늘의 맛집", true);
        return meeting;
    }
}
