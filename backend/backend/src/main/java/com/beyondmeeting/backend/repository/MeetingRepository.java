package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

// Spring Data JPA 사용
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}