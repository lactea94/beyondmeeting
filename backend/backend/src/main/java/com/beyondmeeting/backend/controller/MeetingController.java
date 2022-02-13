package com.beyondmeeting.backend.controller;

import com.beyondmeeting.backend.domain.*;
import com.beyondmeeting.backend.domain.dto.JoinUserInfo;
import com.beyondmeeting.backend.domain.dto.MeetingJoinParam;
import com.beyondmeeting.backend.domain.dto.MeetingCreateParam;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.realm.UserDatabaseRealm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//@PreAuthorize("hasRole('USER')")
@RestController
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final UserHasMeetingRepository userHasMeetingRepository;
    private final UserHasTeamRepository userHasTeamRepository;


    // ======================================== Meeting, UserHasMeeting 조회 ========================================


    /**
     * 회의 전체 리스트 조회
     *
     * @return
     */
    @GetMapping("/meetings")
    public ResponseEntity<List<Meeting>> getMeetings() {
        List<Meeting> meetingList = meetingRepository.findAll();
        if (meetingList == null || meetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(meetingList);
    }

    /**
     * 특정 회의 아이디(meetingId)를 갖는 회의 단건 조회
     *
     * @param meetingId
     * @return
     */
    @GetMapping("/meeting/{meetingId}")
    public ResponseEntity<Optional<Meeting>> getMeetingByMeetingId(@PathVariable Long meetingId) {
        Optional<Meeting> meetingData = meetingRepository.findById(meetingId);
        if (meetingData == null)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(meetingData);
    }

    /**
     * 특정 팀 아이디(teamId)를 갖는 회의 리스트 조회
     *
     * @param teamId
     * @return
     */
    @GetMapping("meeting/team/{teamId}")
    public ResponseEntity<List<Meeting>> getMeetingsByTeamId(@PathVariable Long teamId) {
        Team team = teamRepository.findById(teamId).get();
        List<Meeting> meetingList = meetingRepository.findAllByTeam(team);
        if (meetingList == null || meetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else
            return ResponseEntity.status(HttpStatus.OK).body(meetingList);
    }

    /**
     * 회의 참여자 전체 리스트 조회
     *
     * @return
     */
    @GetMapping("/attenders")
    public ResponseEntity<List<UserHasMeeting>> getAttenders() {
        List<UserHasMeeting> UserHasMeetingList = userHasMeetingRepository.findAll();
        if (UserHasMeetingList == null || UserHasMeetingList.size() == 0)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(UserHasMeetingList);
    }

    /**
     * 특정 회의 아이디(meetingId)를 갖는 회의 참여자 리스트 조회
     *
     * @param meetingId
     * @return
     */
    @GetMapping("/attender/{meetingId}")
    public ResponseEntity<List<UserHasMeeting>> getAttendersByMeetingId(@PathVariable Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId).get();
        List<UserHasMeeting> userHasMeeting = userHasMeetingRepository.findAllByMeeting(meeting);
        if (userHasMeeting == null)
            return ResponseEntity.status(HttpStatus.OK).body(null);
        else return ResponseEntity.status(HttpStatus.OK).body(userHasMeeting);
    }


    // ======================================== Meeting 생성(Create), 참여, 종료(Update) ========================================


    /**
     * 미팅 생성
     *
     * input :
     * { String topic, String meetingType, Long teamId }
     * description:
     * 미팅 주제(topic), 미팅 타입(meetingType), 팀 아이디(teamId) 을 Meeting Table 에 저장
     *
     * @param meetingCreateParam
     * @return
     */
    @PostMapping("/meeting/create")
    public ResponseEntity<Meeting> createMeeting(@RequestBody MeetingCreateParam meetingCreateParam) {

        // BE - class MeetingCreateParam { String topic; MeetingType meetingType; String teamId; }
        // FE - const requestCreateMeeting = { topic: "topic name : axios post test", meetingType: "NORMAL", teamId: 110 } 

        // 파라미터로 넘겨받은 meetingParam 각각의 값을 저장해 줄 meeting 객체 생성
        Meeting meeting = new Meeting();

        // teamId 변수에 meetingCreateParam 의 teamId 값을 저장
        Long teamId = Long.valueOf(meetingCreateParam.getTeamId());

        // meeting 객체에 meetingParam 에서 받아온 데이터들을 하나씩 셋팅 (EndTime 은 미팅 종료 시 셋팅하기 위해 null 저장)
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

    /**
     * 미팅 참여
     *
     * input :
     * { Long meetingId, Long userId, String hatColor }
     * description :
     * 모자 색깔(hatColor), 미팅 아이디(meetingId), 팀 아이디(teamId), 유저 아이디(userId) 를 UserHasMeeting Table 에 저장
     * return :
     * 팀(teamId)과 유저(userId)를 통해 userHasTeamId (targetId)를 찾고,
     * targetId 를 통해 UserHasTeamRepository 에서 유저가 팀에서 맡은 역할(RoleType)을 가져와서 JoinUserInfo 에 값을 넣는다.
     * 더불어 새로 생성한 UserHasMeeting.getHatColor 를 통해 유저가 미팅에서 맡은 모자(HatColor)을 가져와서 JoinUserInfo 에 값을 넣는다.
     * 반환 값인 JoinUserInfo 를 통해 특정 팀에서 생성된 특정 미팅에 참여하는 유저 정보를 확인할 수 있다.
     *
     * 다시 말해, 유저 정보(User), 유저가 속한 미팅(Meeting), 유저가 속한 팀(Team), 유저가 팀에서 맡은 역할(RoleType), 유저가 미팅에서 맡은 모자(HatColor)를 확인할 수 있다.
     *
     * @param meetingJoinParam
     * @return
     */
    @PostMapping("meeting/join")
    public ResponseEntity<JoinUserInfo> joinMeeting(@RequestBody MeetingJoinParam meetingJoinParam) {

        // userId, meetingId 변수에 파라미터로 넘겨받은 MeetingJoinParam 값 저장
        Long userId = meetingJoinParam.getUserId(); // input
        Long meetingId = meetingJoinParam.getMeetingId(); // input
        Long teamId = meetingRepository.findById(meetingId).get().getTeam().getId(); // meetingId 로 찾음
        
        // JoinUserInfo 에 출력하기 위한 정보일 뿐 joinMeeting 로직 수행에는 크게 영향이 없다
        Long targetId = userHasTeamRepository.findAllByTeamAndUser(teamRepository.findById(teamId).get(), userRepository.findById(userId).get()).getId();
        String roleType = String.valueOf(userHasTeamRepository.findById(targetId).get().getRoleType());

        // 유저가 가진 모자 색깔을 저장해줄 UserHasMeeting 객체 생성 및 값 셋팅
        UserHasMeeting userHasMeeting = new UserHasMeeting();
        userHasMeeting.setUser(userRepository.findById(userId).get());
        userHasMeeting.setMeeting(meetingRepository.findById(meetingId).get());
        userHasMeeting.setTeam(teamRepository.findById(teamId).get());
        userHasMeeting.setHat_color(meetingJoinParam.getHatColor());
        //userHasMeeting.setSpeaking_time(null); speakTime 기능 구현 후순위

        // UserHasMeeting 데이터베이스에 반영
        userHasMeetingRepository.save(userHasMeeting);

        // return 해줄 joinUserInfo 객체 생성 (meeting 참여자의 roleType 와 hatColor 정보를 함께 가지고 있는 객체)
        JoinUserInfo joinUserInfo = new JoinUserInfo();

        // JoinUserInfo 값 셋팅
        joinUserInfo.setUser(userRepository.findById(userId).get());
        joinUserInfo.setMeeting(meetingRepository.findById(meetingId).get());
        joinUserInfo.setTeam(teamRepository.findById(teamId).get());
        joinUserInfo.setHatColor(userHasMeeting.getHat_color());
        joinUserInfo.setRoleType(RoleType.valueOf(roleType));

        // JoinUserInfo 객체 리턴
        return ResponseEntity.status(HttpStatus.OK).body(joinUserInfo);
    }

    /**
     * 미팅 종료
     *
     * input :
     * Long meetingId
     * description :
     * 미팅 생성 당시 원래 null 값으로 저장된 미팅 종료 시각(endTime)을 Meeting Table 저장
     *
     * @param meetingId
     * @return
     */
    @PostMapping("meeting/finish")
    public ResponseEntity<Meeting> finishMeeting(@RequestBody Long meetingId) {

        // finishMeeting 함수가 호출되는 시각을 endTime 에 저장
        LocalDateTime endTime = LocalDateTime.now();

        // 원래 @RequestBody 에서 MeetingFinishParam 을 받는데 맴버별 speakTime 구현을 우선순위를 낮추기로 해서 
        // @RequestBody 에서 meetingId 를 파라미터로 넘겨 받았기 때문에 아래 행을 주석처리 함
        // Long meetingId = meetingFinishParam.getMeetingId();
        
        // 파라미터로 받은 meetingId 값으로 meetingRepository 에서 meeting 객체 찾고 미팅 생성 후 null 값이였던 endTime 값을 셋팅
        Meeting meeting = meetingRepository.findById(meetingId).get();
        meeting.setEndTime(endTime);

        // meeting 객체의 변경된 내용 (endTime setting) 을 데이터베이스에 반영 후 meeting 객체 리턴
        meetingRepository.save(meeting);
        return ResponseEntity.status(HttpStatus.OK).body(meeting);
    }
}