package com.beyondmeeting.backend.login.model;
import com.beyondmeeting.backend.domain.UserHasTeam;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

// 데이터베이스 엔터티 만들기
// AuthProvider 포함 ( Enum - google,,)
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})

// getter, setter 롬복으로 리팩토링
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    // userHasTeam 의 user
    @OneToMany(mappedBy = "user")
    private List<UserHasTeam> userHasTeamList = new ArrayList<>();
}
