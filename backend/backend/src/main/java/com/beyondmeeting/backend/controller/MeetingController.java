package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.Meeting;
import com.beyondmeeting.backend.domain.UserHasMeeting;
import com.beyondmeeting.backend.domain.dto.MeetingParam;
import com.beyondmeeting.backend.domain.dto.UserHasMeetingParam;
import com.beyondmeeting.backend.login.model.User;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
//@CrossOrigin(origins = "*") // postman cors error 해결을 위해 추가 -> Desktop Agent 설치로 해결
@RequestMapping("/api") // nginx backend 매핑(?)을 위한 추가 - 소은 2/10
@RestController
@RequiredArgsConstructor
public class MeetingController {

    @Autowired private final MeetingRepository meetingRepository;
    @Autowired private final TeamRepository teamRepository;
    @Autowired private final UserRepository userRepository;

    @Autowired private final UserHasTeamRepository userHasTeamRepository;

    @Autowired private final UserHasMeetingRepository userHasMeetingRepository;
    @Autowired private final UserHasMeetingCustomRepository userHasMeetingCustomRepository;


    /** 회의 리스트 조회
     *
     * @return
     */
    @GetMapping("/meeting/list")
    public ResponseEntity<List<Meeting>> getMeetingList(){
        List<Meeting> meetingList = meetingRepository.findAll();
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

    /** 미팅 생성
     *
     * @return
     */
    @PostMapping("/meeting/create")
    public ResponseEntity<Meeting> createMeeting(@RequestBody MeetingParam meetingParam){

        // meetingParam 을 받아서 저장해 줄 meeting 객체 생성
        Meeting meeting = new Meeting();
        // teamId를 받아서 Long 형 teamId 변수에 값을 저장
        Long teamId = Long.valueOf(meetingParam.getTeamId());

        // meeting 객체에 meetingParam 에서 받아온 데이터들을 하나씩 셋팅 (EndTime 은 미팅 종료시 셋팅)
        meeting.setTopic(meetingParam.getTopic());
        meeting.setMeetingType(meetingParam.getMeetingType());
        meeting.setTeam(teamRepository.findById(teamId).get());
        meeting.setStartTime(LocalDateTime.now());
        meeting.setEndTime(null);

        // meeting 객체를 데이터베이스에 반영
        meetingRepository.save(meeting);

        // meeting 객체에 담긴 내용 리턴
        return ResponseEntity.status(HttpStatus.OK).body(meeting);
    }

//    @PostMapping("userhasmeeting/create")
//    public ResponseEntity<UserHasMeeting> createUserHasMeeting(@RequestBody UserHasMeetingParam userhasMeetingParam){
//        UserHasMeeting userHasMeeting = new UserHasMeeting();
//        User user = userRepository.findById(userhasMeetingParam.getUserId()).get();
//        Meeting meeting = meetingRepository.findById(userhasMeetingParam.getMeetingId()).get();
//
//        userHasMeeting.setUser(user);
//        userHasMeeting.setMeeting(meeting);
//        userHasMeeting.setTeam(userHasTeamRepository.findByUser(user).getTeam());
//        userHasMeeting.setHat_color(userhasMeetingParam.getHatColor());
//        userHasMeeting.setSpeaking_time(null);
//
//        userHasMeetingRepository.save(userHasMeeting);
//        return ResponseEntity.status(HttpStatus.OK).body(userHasMeeting);
//
//    }
}