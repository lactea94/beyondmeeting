package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Meeting;
import com.beyondmeeting.backend.domain.UserHasMeeting;
import com.beyondmeeting.backend.login.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasMeetingRepository extends JpaRepository<UserHasMeeting, Long> {
    UserHasMeeting findByMeeting(Meeting meeting);
    UserHasMeeting findByUser(User user);
}