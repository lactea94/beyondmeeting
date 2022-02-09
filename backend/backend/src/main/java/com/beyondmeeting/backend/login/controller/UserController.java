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

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private UserHasTeamRepository userHasTeamRepository;

//    @GetMapping("/user/me")
//    @PreAuthorize("hasRole('USER')") //hasRole([role]) : 현재 사용자의 권한이 파라미터의 권한과 동일한 경우 true
//    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
//        return userRepository.findById(userPrincipal.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
//    }

    @GetMapping("/user/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
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
