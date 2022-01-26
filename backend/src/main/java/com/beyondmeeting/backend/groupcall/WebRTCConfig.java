package com.beyondmeeting.backend.groupcall;

import org.kurento.client.KurentoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableWebSocket
public class WebRTCConfig implements WebSocketConfigurer {
    //필요한 class를 spring bean에 등록한다.(시작)
    @Bean
    public UserRegistry registry() {
        return new UserRegistry();
    }

    @Bean
    public RoomManager roomManager() {
        return new RoomManager();
    }

    @Bean
    public CallHandler groupCallHandler() {
        return new CallHandler();
    }

    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create("ws://13.124.242.194:8888/kurento");
    }

    @Bean
    public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(32768);
        return container;
    }
    //필요한 class를 spring bean에 등록한다.(끝)

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //연결할 웹소켓의 url과 핸들러를 등록한다.
        System.out.println("/groupcall 등록~!!@!@!@!@!@");
        registry.addHandler(groupCallHandler(), "/groupcall");
    }
}
