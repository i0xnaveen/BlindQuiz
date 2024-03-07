package com.i0xnaveen.quizbckendonline.service;

import com.i0xnaveen.quizbckendonline.model.Question;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {
    Question createQuestion(Question question);
   List<Question> getAllQuestion();
   Optional<Question> getQuestionById(Long id);
   Question updateQuestion(Long id ,Question question) throws ChangeSetPersister.NotFoundException;
   void deleteQuestion(Long id);
   List<Question> getQuestionForUser();
}
