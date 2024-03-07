package com.i0xnaveen.quizbckendonline.repository;

import com.i0xnaveen.quizbckendonline.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long > {
}
