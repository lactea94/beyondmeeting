package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.UserHasTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHasTeamRepository extends JpaRepository<UserHasTeam,Long> {

    List<UserHasTeam> findByUserId(Long userId);
}
