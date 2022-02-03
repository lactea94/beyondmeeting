package backend.chat;

import backend.chat.domain.ChatRoom;
import backend.chat.repository.ChatRoomRepository;
import backend.chat.service.ChatRoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

@SpringBootTest
@Transactional
public class ChatRoomServiceTest {

    @Autowired ChatRoomService chatRoomService;
    @Autowired ChatRoomRepository chatRoomRepository;

    @Test
    public void 채팅방생성() throws Exception{
        // given
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setTitle("room1");

        // when
        Long repo_result = chatRoomRepository.save(chatRoom).getId();
        Long serv_result = chatRoomService.saveRoom(chatRoom);

        // then
        assertEquals(repo_result, serv_result);

    }

    //@Test
    public void 채팅방조회() throws Exception{
        // given
        ChatRoom chatRoom1 = new ChatRoom();
        chatRoom1.setTitle("room1");
        ChatRoom chatRoom2 = new ChatRoom();
        chatRoom2.setTitle("room2");

        // when


        // then
    }

    //@Test                                                                                    t
    public void 채팅방이름조회() throws Exception{
        // given

        // when

        // then

    }
}
