package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.UserHasMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasMeetingRepository extends JpaRepository<UserHasMeeting, Long> {
}