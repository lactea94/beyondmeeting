package backend.chat;

import backend.chat.repository.MessageRepository;
import backend.chat.service.MessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

@SpringBootTest
@Transactional
public class MessageServiceTest {

    @Autowired MessageService messageService;
    @Autowired MessageRepository messageRepository;

    @Test
    public void 메시지생성() throws Exception{

    }

    @Test
    public void 메시지전체조회() throws Exception{

    }
}
