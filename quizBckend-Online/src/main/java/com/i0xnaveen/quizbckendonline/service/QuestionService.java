package com.i0xnaveen.quizbckendonline.service;

import com.i0xnaveen.quizbckendonline.model.Question;
import com.i0xnaveen.quizbckendonline.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class QuestionService implements IQuestionService {

    private  final QuestionRepository questionRepository;
    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion=this.getQuestionById(id);
        if(theQuestion.isPresent()) {
            Question updatedQuestion = theQuestion.get();
            updatedQuestion.setQuestions(question.getQuestions());
            updatedQuestion.setChoices(question.getChoices());
            updatedQuestion.setCorrectAnswer(question.getCorrectAnswer());

            return questionRepository.save(updatedQuestion);
        }
        else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);

    }

    @Override
    public List<Question> getQuestionForUser() {
      return questionRepository.findAll();
    }

}
