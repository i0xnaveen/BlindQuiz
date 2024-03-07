package com.i0xnaveen.quizbckendonline.Controller;

import com.i0xnaveen.quizbckendonline.model.Question;
import com.i0xnaveen.quizbckendonline.model.Users;
import com.i0xnaveen.quizbckendonline.service.IQuestionService;
import com.i0xnaveen.quizbckendonline.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.origin.Origin;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.util.Elements;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController

@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/quizzes")
public class QuestionController {
    private final IQuestionService questionService;
    private final UserService userService;

    @PostMapping("/createQuiz")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question Question){
        Question createdQuestion= questionService.createQuestion(Question);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);

    }

    @GetMapping("/all-question")
    public  ResponseEntity<List<Question>> getAllQuestion(){
        List<Question> questions=questionService.getAllQuestion();
        return ResponseEntity.ok(questions);
    }
    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById( @PathVariable  Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion=questionService.getQuestionById(id);
       if(theQuestion.isPresent()){
           return ResponseEntity.ok(theQuestion.get());
       }
       else{
           throw new ChangeSetPersister.NotFoundException();
       }
    }
    @PutMapping("/question/{id}/update")

    public ResponseEntity<Question> upDateQuestion(
            @PathVariable Long id, @Valid  @RequestBody  Question question) throws ChangeSetPersister.NotFoundException {
        Question updatedQuestion=questionService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void>deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/quiz/fetch-question-for-user")
    public ResponseEntity<List<Question>> getQuestionForUser(){
        List<Question> allQuestion=questionService.getQuestionForUser();
        return ResponseEntity.ok(allQuestion);
    }
    @PostMapping("/checkUser")
    public boolean checkUser(@RequestBody Users users){
        return userService.checkUser(users);
    }
    @PostMapping("/addMarks")
    public ResponseEntity<Void> addMarks(@RequestBody Users users){
        userService.addMarks(users);
        return ResponseEntity.ok().build();
    }
}

