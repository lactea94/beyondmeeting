package com.beyondmeeting.backend;

import com.beyondmeeting.backend.login.config.AppProperties;
import com.beyondmeeting.backend.meeting.Meeting;
import com.beyondmeeting.backend.meeting.MeetingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

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
// 데이터 저장하기
			meetingRepository.save(new Meeting("전철우 사거리 맛집", true));

// 데이터 전부 조회하기
//			List<Course> courseList = repository.findAll();
//			for (int i=0; i<courseList.size(); i++) {
//				Course course = courseList.get(i);
//				System.out.println(course.getId());
//				System.out.println(course.getTitle());
//				System.out.println(course.getTutor());
//			}

// 데이터 하나 조회하기
//			Course course = repository.findById(1L).orElseThrow(
//					() -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
//			);
			/******************************End*****************************************/
		};
	}

}
