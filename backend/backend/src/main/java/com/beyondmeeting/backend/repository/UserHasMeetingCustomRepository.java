package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.UserHasMeeting;

import java.util.List;

public interface UserHasMeetingCustomRepository {
    UserHasMeeting save(UserHasMeeting userHasMeeting);
    List<UserHasMeeting> findByMeetingId(Long meetingId);
}