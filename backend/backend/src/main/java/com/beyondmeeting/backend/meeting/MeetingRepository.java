package com.beyondmeeting.backend.meeting;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting,Long> {
    // Meeting을 대상으로, id (primary key)의 형태가 Long
}
