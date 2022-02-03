package com.beyondmeeting.backend.meeting;

import com.beyondmeeting.backend.TimeStamped;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor // 기본생성자를 대신해줌
@Getter
@Entity
public class Meeting extends TimeStamped {
// timestamp 로 start, end 받아옴

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String topic;

    private boolean defaultType; // 기본회의, 6모자 중 선택

    public Meeting(Long i) {
        this.id =id;
    }

    public Meeting(String topic, boolean defaultType) {
        this.topic = topic;
        this.defaultType = defaultType;
    }
}
