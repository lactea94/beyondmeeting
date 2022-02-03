package com.beyondmeeting.backend.team;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team,Long> {
    // Team을 대상으로, id (primary key)의 형태가 Long
}
