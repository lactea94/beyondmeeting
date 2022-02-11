package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.Meeting;
import com.beyondmeeting.backend.domain.Team;
import com.beyondmeeting.backend.domain.UserHasMeeting;
import com.beyondmeeting.backend.domain.dto.MeetingJoinParam;
import com.beyondmeeting.backend.domain.dto.MeetingCreateParam;
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
//@RequestMapping("/api") // nginx backend 매핑(?)을 위한 추가 - 소은 2/10
//@PreAuthorize("hasRole('USER')")
@RestController
@RequiredArgsConstructor
public class MeetingController {

    @Autowired private final MeetingRepository meetingRepository;
    @Autowired private final UserRepository userRepository;
    @Autowired private final TeamRepository teamRepository;
    @Autowired private final UserHasMeetingRepository userHasMeetingRepository;


    // ======================================== Meeting, UserHasMeeting 조회 ========================================


    /** 회의 전체 리스트 조회
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

    /** 특정 회의 아이디를 갖는 회의 단건 조회
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

    /** 특정 팀 아이디를 갖는 회의 리스트 조회
     *
     * @param teamId
     * @return
     */
    @GetMapping("meeting/team/{teamId}")
    public ResponseEntity<List<Meeting>> getMeetingByTeam(@PathVariable Long teamId){
        Team team = teamRepository.findById(teamId).get();
        List<Meeting> meetingList = meetingRepository.findAllByTeam(team);
        if (meetingList == null || meetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else
            return ResponseEntity.status(HttpStatus.OK).body(meetingList);
    }

    /** 회의 참여자 전체 리스트 조회
     *
     * @return
     */
    @GetMapping("/userhasmeeting/list")
    public ResponseEntity<List<UserHasMeeting>> getUserHasMeeting(){
        List<UserHasMeeting> UserHasMeetingList = userHasMeetingRepository.findAll();
        if (UserHasMeetingList == null || UserHasMeetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(UserHasMeetingList);
    }

    /** 특정 회의 아이디를 갖는 회의 참여자 리스트 조회
     *
     * @param meetingId
     * @return
     */
    @GetMapping("/userhasmeeting/{meetingId}")
    public ResponseEntity<List<UserHasMeeting>> getUserHasMeetingByMeeting(@PathVariable Long meetingId){
        Meeting meeting = meetingRepository.findById(meetingId).get();
        List<UserHasMeeting> userHasMeeting = userHasMeetingRepository.findAllByMeeting(meeting);
        if (userHasMeeting == null)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(userHasMeeting);
    }


    // ======================================== Meeting 생성(Create), 참여, 종료(Update) ========================================


    /** 미팅 생성
     *
     * @param meetingCreateParam
     * @return
     */
    @PostMapping("/meeting/create")
    public ResponseEntity<Meeting> createMeeting(@RequestBody MeetingCreateParam meetingCreateParam){

        // meetingParam 을 받아서 저장해 줄 meeting 객체 생성
        Meeting meeting = new Meeting();

        // teamId를 받아서 Long 형 teamId 변수에 값을 저장
        Long teamId = Long.valueOf(meetingCreateParam.getTeamId());

        // meeting 객체에 meetingParam 에서 받아온 데이터들을 하나씩 셋팅 (EndTime 은 미팅 종료시 셋팅)
        meeting.setTopic(meetingCreateParam.getTopic());
        meeting.setMeetingType(meetingCreateParam.getMeetingType());
        meeting.setTeam(teamRepository.findById(teamId).get());
        meeting.setStartTime(LocalDateTime.now());
        meeting.setEndTime(null);

        // meeting 객체를 데이터베이스에 반영
        meetingRepository.save(meeting);

        // meeting 객체에 담긴 내용 리턴
        return ResponseEntity.status(HttpStatus.OK).body(meeting);
    }

    /** 미팅 참여
     *
     * @param meetingJoinParam
     * @return
     */
    @PostMapping("meeting/join")
    public ResponseEntity<UserHasMeeting> joinMeeting(@RequestBody MeetingJoinParam meetingJoinParam){

        UserHasMeeting userHasMeeting = new UserHasMeeting();

        Long userId = meetingJoinParam.getUserId();
        Long meetingId = meetingJoinParam.getMeetingId();

        userHasMeeting.setUser(userRepository.findById(userId).get());
        userHasMeeting.setMeeting(meetingRepository.findById(meetingId).get());
        userHasMeeting.setTeam(meetingRepository.findById(meetingId).get().getTeam());
        userHasMeeting.setHat_color(meetingJoinParam.getHatColor());
        userHasMeeting.setSpeaking_time(null);

        userHasMeetingRepository.save(userHasMeeting);
        return ResponseEntity.status(HttpStatus.OK).body(userHasMeeting);
    }

//    /** 미팅 종료
//     *
//     * @param meetingFinishParam
//     * @return
//     */
//    @PostMapping("meeting/finish") // 끝난시각, 발화시각 업데이트를 위함
//    public ResponseEntity<Meeting> finishMeeting(@RequestBody MeetingFinishParam meetingFinishParam){
//
//        Long meetingId = meetingFinishParam.getMeetingId();
//        LocalDateTime endTime = LocalDateTime.now();
//        meetingRepository.updateEndTime(endTime, meetingId);
//
//        for (UserHasMeeting user :
//             ) {
//
//        }
//
//        return null;
//    }


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