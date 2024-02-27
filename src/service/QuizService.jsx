import axios from "axios";
const baseURL="http://localhost:9192/api/quizzes";
export const api=axios.create({baseURL});
export const createQuestion=async(quizQuestion)=>{
   try{
    const response=await api.post("/createQuiz",quizQuestion);
     return await response.data;
  }catch(err){

    
      console.log("Error in creating question", err);
   }
}
export const checkUser=async(users)=>{
    try{
        const response=await api.post("/checkUser",users);
        return await response.data
    }
    catch(err){
        alert("login failed")

    }
}
export const getAllQuestion= async()=> {
    try{
        const response=await api.get("/all-question");
        return await response.data;
    }
    catch(error) {
        console.log('Error in fetching all questions', error);
    }
}
export const  getQuizById = async (id) => {
    try{
        const response=await api.get(`/question/${id}`);
        return response.data;
    }
    catch(error){
        console.log('Error in getting quiz by id ', error);
    }
}
export const updateQuestion=async(id,question)=>{
    try{
    const response=await api.put(`/question/${id}/update`,question);
    return response.data;
}catch(error){
    console.log('Error in updating the question');
}
}
export const deleteQuestionById=async(id)=>{
    try{
        const response=await api.delete(`/question/${id}/delete`);
        return response.data;
    }
    catch(error){
        console.log('Error in deleting the question');
    }
}
