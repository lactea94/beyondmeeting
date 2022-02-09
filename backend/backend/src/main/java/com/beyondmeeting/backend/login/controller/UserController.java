package com.beyondmeeting.backend.login.controller;


import com.beyondmeeting.backend.domain.dto.UserDto;
import com.beyondmeeting.backend.login.exception.ResourceNotFoundException;
import com.beyondmeeting.backend.login.model.User;
import com.beyondmeeting.backend.login.repository.UserRepository;
import com.beyondmeeting.backend.login.security.CurrentUser;
import com.beyondmeeting.backend.login.security.UserPrincipal;
import com.beyondmeeting.backend.repository.UserHasTeamRepository;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
/*
@PreAuthorize("hasRole('USER')")
가입 시 제한된 리소스에 접근할 수 있는 ROLE_USER 권한을 회원에게 부여한다.
SpringSecurity 설정에는 접근 제한이 필요한 리소스에 대해서 ROLE_USER 권한을 가져야 접근이 가능하도록 세팅한다.
권한을 가진 회원이 로그인 성공 시엔 리소스에 접근할 수 있는 Jwt 보안 토큰을 발급한다.
코드 작성 위치에 따라 클래스 내 모든 메소드에 적용하거나 메소드별로 권한부여가 가능하다
 */
@PreAuthorize("hasRole('USER')")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private UserHasTeamRepository userHasTeamRepository;
    
    @GetMapping("/user/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        System.out.println("test1: "+ String.valueOf(userPrincipal.getId()));
        System.out.println("test2: "+String.valueOf(userRepository.findById(userPrincipal.getId())));
        System.out.println("test3: "+String.valueOf(userRepository.findById(userPrincipal.getId()).get()));
        System.out.println("test4: "+String.valueOf(userRepository.findById(userPrincipal.getId()).get().getId()));
        System.out.println("test5: "+String.valueOf(userRepository.findById(userPrincipal.getId()).get().getEmail()));

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    // 내 정보 조회
    @GetMapping("/user/{id}")
    public UserDto getUser(@PathVariable Long id) {

        User user = userRepository.findById(id).get();

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUserName(user.getName());
        userDto.setUserEmail(user.getEmail());
        userDto.setUserImage(user.getImageUrl());
        userDto.setUserHasTeamList(user.getUserHasTeamList());
        userDto.setUserHasMeetingList(user.getUserHasMeetingList());
        
        return userDto;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    // 추후에 데이터 삭제하지 않고 flag 처리 ..
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id){
        String userName = userRepository.findById(id).get().getName();
        userRepository.deleteById(id);
        return userName;
    }
}
