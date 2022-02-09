package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Meeting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional // 테스트코드에서 서비스가 아닌 리포지토리를 호출하기 때문에 어노테이션을 달아줌
@RequiredArgsConstructor
public class MeetingCustomRepositoryImpl implements MeetingCustomRepository {

    private final EntityManager em;

    /** 미팅 생성
     *
     * @param meeting
     * @return
     */
    @Override
    public Meeting save(Meeting meeting) {
        if (meeting.getId() == null){
            em.persist(meeting);
        } else {
            em.merge(meeting);
        }
        return meeting;
    }

    /** 특정 팀 아이디를 갖는 미팅 여러건 조회
     *
     * @return
     */
    @Override
    public List<Meeting> findByTeamId(Long teamId) {
        return em.createQuery("select m " +
                        "from Meeting m join m.team t " +
                        "where t.id =:teamId", Meeting.class)
                .setParameter("teamId", teamId)
                .getResultList();
    }
    // ERROR : meeting is not mapped [select m from meeting m join m.team t where t.id =:teamId]; nested exception is java.lang.IllegalArgumentException
    // SOLUTION : meeting convert to Meeting

    /** 미팅 여러건 조회
     *
     * @return
     */
    @Override
    public List<Meeting> findAll() {
        return em.createQuery("select m from Meeting m", Meeting.class)
                .getResultList();
    }
}