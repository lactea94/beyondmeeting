package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.UserHasTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasTeamRepository extends JpaRepository<UserHasTeam,Long> {
}
