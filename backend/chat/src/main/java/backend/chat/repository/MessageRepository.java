package backend.chat.repository;

import backend.chat.domain.ChatRoom;
import backend.chat.domain.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MessageRepository implements IMessageRepository{

    private final EntityManager em;

    /** 메시지 생성
     *
     * @param message
     * @return
     */
    @Override
    public Message save(Message message) {
        if (message.getId() == null){
            em.persist(message);
        } else {
            em.merge(message);
        }
        return message;
    }

    /** 메시지 조회
     *
     * @param chatroom
     * @param message
     * @return
     */
    @Override
    public List<Message> findAll(Long messageId, Long chatroomId) {
        return em.createQuery("select m from message m join m.chatroom c" +
                "where m.messageId = :messageId" +
                "and c.chatroomId = :chatroomId", Message.class)
                .setParameter("messageId", messageId)
                .setParameter("chatroomId", chatroomId)
                .getResultList();
    }
}
