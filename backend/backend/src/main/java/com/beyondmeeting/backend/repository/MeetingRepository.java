package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

// Spring Data JPA 사용
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}