package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Meeting;

import java.util.List;

public interface MeetingCustomRepository {
    Meeting save(Meeting meeting);
    List<Meeting> findByTeamId(Long teamId);
    List<Meeting> findAll();
}