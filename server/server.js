const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

const Question = require("../modals/questionmodal");
const Content = require("../modals/contentmodal");

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongourl = "mongodb+srv://naveen62113:62113@cluster0.v1q65b1.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongourl).then(() => {
  console.log("Connected to the database");
}).catch((e) => console.log(e));

app.post('/store-question', async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options) {
      return res.status(400).json({ error: 'Question and options are required.' });
    }

    const newQuestion = new Question({
      question,
      options
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Question Stored Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/store-content', async (req, res) => {
    try {
      const { content } = req.body;
      let contentString = content;  
  
    
      if (typeof content === 'object') {
        contentString = content.content;
      }
  
      if (!contentString) {
        return res.status(400).json({ error: 'Content is required.' });
      }
  
      const newContent = new Content({
        content: contentString,
      });
  
      await newContent.save();
      res.status(201).json({ message: 'Content Stored Successfully' });
    } catch (error) {
      console.error(error);     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/get-contents', async (req, res) => {
    try {
      const contents = await Content.find(); 
  
      res.status(200).json(contents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  