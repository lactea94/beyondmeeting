package backend.chat.repository;

import backend.chat.domain.ChatRoom;
import backend.chat.domain.Message;

import java.util.List;

public interface IMessageRepository {
    public Message save(Message message);
    public List<Message> findAll(Long messageId, Long chatroomId);
    //List<Message> getMessagesByChatroomId(@Param("roomId") long roomId, @Param("idx") long idx);
}

