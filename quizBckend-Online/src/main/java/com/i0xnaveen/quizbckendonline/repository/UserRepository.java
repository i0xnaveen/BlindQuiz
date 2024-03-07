package com.i0xnaveen.quizbckendonline.repository;

import com.i0xnaveen.quizbckendonline.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.math.BigInteger;

public interface UserRepository extends JpaRepository<Users, Long> {
}
