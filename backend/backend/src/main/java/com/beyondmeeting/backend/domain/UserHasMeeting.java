package com.beyondmeeting.backend.domain;

import com.beyondmeeting.backend.login.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.lang.annotation.Target;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@SequenceGenerator(name = "UserHasMeeting_SEQ_GENERATOR", sequenceName = "UserHasMeeting_SEQ", initialValue = 1, allocationSize = 1)
public class UserHasMeeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(targetEntity = Meeting.class, fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @JsonIgnore
    @ManyToOne(targetEntity = Team.class, fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "team_id")
    private Team team;

    @Enumerated(EnumType.STRING)
    private HatColor hat_color;

    private Long speaking_time;
}