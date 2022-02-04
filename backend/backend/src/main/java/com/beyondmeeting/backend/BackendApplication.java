package com.beyondmeeting.backend;

import com.beyondmeeting.backend.domain.dto.UserHasTeamDto;
import com.beyondmeeting.backend.login.config.AppProperties;
import com.beyondmeeting.backend.domain.Meeting;
import com.beyondmeeting.backend.repository.MeetingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing // Audit : 감시하다! 시간에 대해서 주시하는 역할.. 즉 TimeStamped 클래스를 사용하기 위함 - 진주/0127
@EnableConfigurationProperties(AppProperties.class) //AppProperties 활성화 - 진주/0125
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	public CommandLineRunner demo(MeetingRepository meetingRepository) {
		return (args) -> {
			/*****************************Insert****************************************/


			// insert
			meetingRepository.save(new Meeting("전철우 사거리 맛집", true));

			// select
			List<Meeting> meetingList = meetingRepository.findAll();
			for (int i=0; i<meetingList.size(); i++) {
				Meeting meeting = meetingList.get(i);
				System.out.println(meeting.getId());
				System.out.println(meeting.getTopic());
				System.out.println(meeting.isDefaultType()); // boolean 형은 get아니고 is
			}

// 데이터 하나 조회하기
//			Course course = repository.findById(1L).orElseThrow(
//					() -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
//			);

			//update
			// service 에서 만들어줘야함

			// delete
			meetingRepository.deleteAll();
			/******************************End*****************************************/
		};
	}

}
