package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}