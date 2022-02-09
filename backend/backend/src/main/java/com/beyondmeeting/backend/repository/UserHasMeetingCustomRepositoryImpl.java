package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.UserHasMeeting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class UserHasMeetingCustomRepositoryImpl implements UserHasMeetingCustomRepository {

    private final EntityManager em;

    /** 저장
     *
     * @param userHasMeeting
     * @return
     */
    @Override
    public UserHasMeeting save(UserHasMeeting userHasMeeting){
        if (userHasMeeting.getId() == null){
            em.persist(userHasMeeting);
        } else {
            em.merge(userHasMeeting);
        }
        return userHasMeeting;
    }

    @Override
    public List<UserHasMeeting> findByMeetingId(Long meetingId){
        return em.createQuery("select u " +
                        "from UserHasMeeting u join u.meeting m " +
                        "where m.id = :meetingId", UserHasMeeting.class)
                .setParameter("meetingId", meetingId)
                .getResultList();
    }

}