package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Message;

import java.util.List;

public interface MessageCustomRepository {
    List<Message> findByMeetingId(Long meetingId);
}