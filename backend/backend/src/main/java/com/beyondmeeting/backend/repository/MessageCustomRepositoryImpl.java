package com.beyondmeeting.backend.repository;

import com.beyondmeeting.backend.domain.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class MessageCustomRepositoryImpl implements MessageCustomRepository {

    private final EntityManager em;

    @Override
    public List<Message> findByMeetingId(Long meetingId) {
        return em.createQuery("select m " +
                        "from Message m join m.meeting t " +
                        "where t.id = :meetingId", Message.class)
                .setParameter("meetingId", meetingId)
                .getResultList();
    }
}