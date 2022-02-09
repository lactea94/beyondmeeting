package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.Meeting;
import com.beyondmeeting.backend.domain.UserHasMeeting;
import com.beyondmeeting.backend.repository.MeetingCustomRepository;
import com.beyondmeeting.backend.repository.MeetingRepository;
import com.beyondmeeting.backend.repository.UserHasMeetingCustomRepository;
import com.beyondmeeting.backend.repository.UserHasMeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MeetingController {

    @Autowired private final MeetingRepository meetingRepository;
    @Autowired private final MeetingCustomRepository meetingCustomRepository;
    @Autowired private final UserHasMeetingRepository userHasMeetingRepository;
    @Autowired private final UserHasMeetingCustomRepository userHasMeetingCustomRepository;

    /** 회의 리스트 조회
     *
     * @return
     */
    @GetMapping("/meeting/list")
    public ResponseEntity<List<Meeting>> getMeetingList(){
        List<Meeting> meetingList = meetingCustomRepository.findAll();
        if (meetingList == null || meetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(meetingList);
    }

    /** 회의 단건 조회 (회의 아이디 이용)
     *
     * @param meetingId
     * @return
     */
    @GetMapping("/meeting/{meetingId}")
    public ResponseEntity<Optional<Meeting>> getMeetingByMeetingId(@PathVariable Long meetingId){
        Optional<Meeting> meetingData = meetingRepository.findById(meetingId);
        if (meetingData == null)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(meetingData);
    }

    /** 사용자 회의 결과 리스트 조회
     *
     * @return
     */
    @GetMapping("/userhasmeeting/list")
    public ResponseEntity<List<UserHasMeeting>> getUserHasMeetingList(){
        List<UserHasMeeting> UserHasMeetingList = userHasMeetingRepository.findAll();
        if (UserHasMeetingList == null || UserHasMeetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(UserHasMeetingList);
    }

    /** 사용자 회의 결과 단건 조회 (회의 아이디 이용)
     *
     * @param meetingId
     * @return
     */
    @GetMapping("/userhasmeeting/{meetingId}")
    public ResponseEntity<Optional<UserHasMeeting>> getUserHasMeetingByMeetingId(@PathVariable Long meetingId){
        Optional<UserHasMeeting> UserHasMeetingListData = userHasMeetingCustomRepository.findByMeetingId(meetingId).stream().findAny();
        if (UserHasMeetingListData == null)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(UserHasMeetingListData);
    }
}