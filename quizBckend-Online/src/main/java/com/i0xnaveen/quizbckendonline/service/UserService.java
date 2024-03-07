package com.i0xnaveen.quizbckendonline.service;

import com.i0xnaveen.quizbckendonline.model.Users;
import com.i0xnaveen.quizbckendonline.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final Users users1 = new Users(210420104109L, LocalDate.parse("2003-03-22"), 0);
    private final Users users2 = new Users(210420104108L, LocalDate.parse("2002-12-31"), 0);

    public  void saveUser(Users users){
        Users user=new Users();
        user.setRollNo(users.getRollNo());
        user.setDob(users.getDob());
        userRepository.save(user);
    }
    public  boolean checkUser(Users users) {
        userRepository.save(users1);
        userRepository.save(users2);
        long rollNo=users.getRollNo();
       return userRepository.findById(rollNo).isPresent();
    }


    public void addMarks(Users users) {
        long rollNo = users.getRollNo();
        Optional<Users> optionalUser = userRepository.findById(rollNo);

        optionalUser.ifPresent(user -> {
             user.setMarks(users.getMarks());
            userRepository.save(user);
        });
    }

}
